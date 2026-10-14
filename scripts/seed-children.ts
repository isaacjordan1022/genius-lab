/** Run with DATABASE_URL, GENIUS_AHARON_PASSWORD, GENIUS_TOBI_PASSWORD in environment.
 * Existing password hashes and saved learning are preserved on repeat execution.
 * Explicit GENIUS_RESET_PASSWORDS=1 rotates passwords and revokes sessions. */
import { transaction, pool } from "../src/lib/account-database";
import { hashPassword } from "../src/lib/passwords";
import { initialState } from "../src/lib/store";
const children = [
  {id:"aharon",username:"aharonzev",name:"Aharon Zev",age:10,grade:5,password:process.env.GENIUS_AHARON_PASSWORD},
  {id:"tobi",username:"tobi",name:"Tobi",age:7,grade:2,password:process.env.GENIUS_TOBI_PASSWORD},
];
async function main() {
  if (children.some(child => !child.password)) throw new Error("Set both child password environment variables before seeding.");
  await transaction(async client => {
    for (const child of children) {
      const hash = hashPassword(child.password!);
      await client.query(`INSERT INTO genius_children(id,username,password_hash,display_name,age,grade) VALUES($1,$2,$3,$4,$5,$6)
        ON CONFLICT(id) DO UPDATE SET username=EXCLUDED.username,display_name=EXCLUDED.display_name,age=EXCLUDED.age,grade=EXCLUDED.grade`, [child.id,child.username,hash,child.name,child.age,child.grade]);
      if (process.env.GENIUS_RESET_PASSWORDS === "1") {
        await client.query("UPDATE genius_children SET password_hash=$2 WHERE id=$1",[child.id,hash]);
        await client.query("DELETE FROM genius_sessions WHERE child_id=$1",[child.id]);
      }
      await client.query("INSERT INTO genius_progress(child_id,state) VALUES($1,$2::jsonb) ON CONFLICT(child_id) DO NOTHING", [child.id,JSON.stringify(initialState())]);
    }
  });
  console.log("Ready: AharonZev and Tobi. Existing learning progress preserved.");
}
main().catch(() => { console.error("Account setup failed. Check database connectivity and password environment variables."); process.exitCode=1; }).finally(() => pool().end());
