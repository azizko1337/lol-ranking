import openDB from "../db/openDB.js";

async function getSummonerHistory(summonerId) {
  const db = await openDB();
  const summonerHistory = await db.all(
    "SELECT * FROM History WHERE summonerId = ?",
    [summonerId]
  );
  await db.close();
  return summonerHistory;
}

export default getSummonerHistory;
