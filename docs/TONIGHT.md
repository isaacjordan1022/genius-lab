# Genius Lab — first family dry run

Live app: https://genius-lab-beta.vercel.app

## Start

Sign in with the child's supplied credentials. Start **Day 1** from the dashboard. Each child has a separate Neon-backed account, curriculum, saved answers, scores, ticket wallet and prize history. The older localhost pilot is separate and is not the children's starting state.

- Aharon Zev: the windmill mystery, contextual vocabulary and evidence-based interpretation; visual fractions; Monet, Impressionism and light.
- Tobi: the giant rabbit mystery and four new words; an interactive shadow experiment; Mondrian-inspired colour, shapes and equal shares.

Read or listen to the teaching. Quiz answers can be typed or spoken. The first use of Speak asks the browser for microphone permission. Narration highlights the material already on screen. Quit saves an unfinished quiz; Restart clears only that unfinished quiz. Submitted answers remain saved.

Correct, finalized answers earn five tickets when the chunk quiz is submitted and checked. A day passed at 90% tops the day's core earnings up to 100. Bonus questions can earn five more tickets and stay in the child's extra-credit bank. Equivalent retry questions cannot pay twice. The learning score out of four and prize tickets are separate.

Passing the day opens the arcade and daily review race. The race is a simple 3D course with question checkpoints drawn from completed work. Preview playground is available for testing games without saving scores or earning tickets.

## Scope tonight

Aharon's five-day curriculum and weekly test are published. Tobi has one carefully prepared daily lesson; her remaining days and weekly test are not published yet. New future curriculum is not automatically scheduled. Accounts, progress, rewards, AI grading, AI bonus questions, narration and speech transcription are connected to the deployed service.

Prize checkout records the redemption, spends the wallet balance and saves prize history. It does not place an order with Amazon or another retailer. Fulfilment remains managed here.

## Helpful observations to report

- A response graded unfairly: the question, the child's answer and feedback.
- A passage or explanation that is too hard, too easy or too long.
- Any voice timing, microphone, game-control or save problem, with the device/browser used.

Passwords and service keys are deliberately not stored in this document.

## Verified deployment

October 7: production build and 61 automated tests passed. Live checks completed both children's full Day 1 through real AI grading, saved all 15 answers, verified 100 daily tickets plus a five-ticket bonus, prevented duplicate awards, checked account isolation and revoked sessions on logout. ElevenLabs narration returned aligned audio; a synthetic audio transcription round trip passed. A physical microphone remains a device-level check. All generated test progress was restored to the original fresh state before handoff.
