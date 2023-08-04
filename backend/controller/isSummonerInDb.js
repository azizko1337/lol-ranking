import openDB from "../db/openDB.js";

async function isSummonerInDb(summonerId) {
  const db = await openDB();
  const summoner = await db.get("SELECT * FROM Summoner WHERE summonerId = ?", [
    summonerId,
  ]);
  await db.close();
  return summoner != null;
}

export default isSummonerInDb;
