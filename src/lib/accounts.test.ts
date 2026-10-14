import test from "node:test";
import assert from "node:assert/strict";
import { hashPassword, verifyPassword, tokenHash } from "./passwords";
import { createStore, initialState, type StoreCatalog } from "./store";
import { LESSONS_V3, WEEK_TITLE_V3, WEEK_OBJECTIVES_V3 } from "./lesson-content-v3";
import type { LearningAI } from "./learning-ai";
const ai:LearningAI = {grade:async items=>items.map(({question})=>({questionId:question.id,points:4,feedback:"Clear reasoning.",criteria:[],model:"test",gradedAt:new Date().toISOString()})),bonus:async()=>{throw new Error("unused");}};
function catalog(id:string):StoreCatalog {return {lessons:LESSONS_V3,weekTitle:WEEK_TITLE_V3,weekObjectives:WEEK_OBJECTIVES_V3,profile:{id,name:id,age:7,grade:2},publishedDays:5};}
test("passwords have unique salted hashes and tokens are stored only as hashes",()=>{
  const first=hashPassword("test password"), second=hashPassword("test password");
  assert.notEqual(first,second);
  assert.equal(verifyPassword("test password",first),true);
  assert.equal(verifyPassword("incorrect",first),false);
  assert.equal(verifyPassword("", "invalid"),false);
  assert.equal(tokenHash("session").length,64);
  assert.notEqual(tokenHash("session"),"session");
});
test("request stores isolate child state, award final correct answers once, survive serialization", async()=>{
  const a=createStore(undefined,undefined,ai,{seed:initialState(),catalog:catalog("aharon"),answerTickets:true});
  const b=createStore(undefined,undefined,ai,{seed:initialState(),catalog:catalog("tobi"),answerTickets:true});
  const lesson=LESSONS_V3[0], section=lesson.chunks[0];
  const id=a.start(lesson.id); a.taught(id,section.id);
  const questions=lesson.forms[0].filter(q=>section.questionIds[0].includes(q.id));
  for(const q of questions) a.save(id,q.id,q.kind==="choice"?q.correct!:q.kind==="match"?Object.fromEntries(q.matches!.map(p=>[p.left,p.right])):"A supported explanation",a.read().revision);
  assert.equal(a.read().balance,0);
  a.submitChunk(id,section.id); await a.gradePending(id);
  assert.equal(a.read().balance,questions.length*5);
  assert.equal(b.read().attempts.length,0);
  assert.equal(b.read().balance,0);
  const restored=createStore(undefined,undefined,ai,{seed:JSON.parse(JSON.stringify(a.read())),catalog:catalog("aharon"),answerTickets:true});
  restored.reconcileRewards(); await restored.gradePending(id);
  assert.equal(restored.read().balance,questions.length*5);
  assert.equal(restored.view().profile.name,"aharon");
  assert.equal(restored.view().rewardPolicy,"correct-answers");
  assert.ok(!restored.view().active!.questions.some(q=>"correct" in q||"exemplar" in q));
  assert.throws(()=>b.resume(id),/Attempt not found/);
});
test("answer-ticket economy tops up to 100 and equivalent retry slots cannot be farmed",async()=>{
  const store=createStore(undefined,undefined,ai,{seed:initialState(),catalog:catalog("aharon"),answerTickets:true});
  const lesson=LESSONS_V3[0];
  for(let form=0;form<2;form++) {
    const id=store.start(lesson.id);
    for(let sectionIndex=0;sectionIndex<lesson.chunks.length;sectionIndex++) {
      const section=lesson.chunks[sectionIndex]; store.taught(id,section.id);
      for(const q of lesson.forms[form].filter(q=>section.questionIds[form].includes(q.id))) {
        const wrongFirstForm=form===0&&sectionIndex>0&&q.kind==="choice";
        const answer=q.kind==="choice"?(wrongFirstForm?q.choices!.find(choice=>choice!==q.correct)!:q.correct!):q.kind==="match"?Object.fromEntries(q.matches!.map(p=>[p.left,p.right])):"A supported explanation";
        store.save(id,q.id,answer,store.read().revision);
      }
      store.submitChunk(id,section.id); await store.gradePending(id);
    }
    if(form===0) assert.equal(store.read().passed.includes(lesson.id),false);
  }
  assert.equal(store.read().balance,100);
  assert.equal(store.read().passed.includes(lesson.id),true);
  assert.equal(store.read().ledger.filter(e=>e.event.startsWith("answer:")).length,15);
  store.reconcileRewards(); assert.equal(store.read().balance,100);
});
