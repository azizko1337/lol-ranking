import openDB from "../db/openDB.js";

async function getNickFromId(summonerId) {
  const db = await openDB();
  const res = await db.get(
    "SELECT lastKnownNick FROM Summoner WHERE summonerId = ?",
    [summonerId]
  );
  const nick = res?.lastKnownNick;
  await db.close();
  return nick;
}

export default getNickFromId;
