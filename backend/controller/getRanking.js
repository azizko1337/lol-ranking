import openDB from "../db/openDB.js";

async function getRanking() {
  const db = await openDB();
  const ranking = await db.all(
    "SELECT * FROM Summoner ORDER BY summonerPoints DESC"
  );
  await db.close();
  return ranking;
}

export default getRanking;
