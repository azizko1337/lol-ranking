import openDB from "../db/openDB.js";

async function updateNick(summonerId, nick) {
  const db = await openDB();
  await db.run("UPDATE Summoner SET lastKnownNick = ? WHERE summonerId = ?", [
    nick,
    summonerId,
  ]);
  await db.close();
}

export default updateNick;
