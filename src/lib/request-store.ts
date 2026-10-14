import type { NextRequest } from "next/server";
import { requireChild } from "./auth";
import { transaction } from "./account-database";
import { createStore, getStore, initialState, type Store, type StoreState } from "./store";
import { createLearningAI } from "./learning-ai";
import { getCurriculumForChild, getBonusSeedForChunk } from "./child-curriculum";

export async function withRequestStore<T>(req: NextRequest, work: (store: Store) => T | Promise<T>): Promise<T> {
  const child = await requireChild(req);
  if (!child) return work(getStore());
  return transaction(async client => {
    await client.query("INSERT INTO genius_progress(child_id,state) VALUES($1,$2::jsonb) ON CONFLICT(child_id) DO NOTHING", [child.id,JSON.stringify(initialState())]);
    const result = await client.query<{state:StoreState}>("SELECT state FROM genius_progress WHERE child_id=$1 FOR UPDATE",[child.id]);
    const catalog = getCurriculumForChild(child.id as "aharon"|"tobi");
    const store = createStore(undefined,undefined,createLearningAI(fetch,child),{
      seed:result.rows[0].state,catalog:{...catalog,profile:child},answerTickets:true,
      bonusSeed: chunkId => getBonusSeedForChunk(child.id as "aharon"|"tobi",chunkId),
    });
    const value = await work(store);
    const state = store.read();
    if (state.revision !== result.rows[0].state.revision)
      await client.query("UPDATE genius_progress SET state=$2::jsonb,updated_at=now() WHERE child_id=$1",[child.id,JSON.stringify(state)]);
    // Only family leaderboard totals are shared; no sibling answers or account fields.
    if (value && typeof value === "object" && "siblings" in value) {
      const siblings = await client.query<{name:string;earned:number}>(`SELECT c.display_name AS name,COALESCE((p.state->>'lifetime')::integer,0) AS earned
        FROM genius_children c LEFT JOIN genius_progress p ON p.child_id=c.id WHERE c.id<>$1 ORDER BY c.age DESC`,[child.id]);
      (value as {siblings:{name:string;earned:number}[]}).siblings = siblings.rows;
    }
    return value;
  });
}
