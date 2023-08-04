import openDB from "../db/openDB.js";
import getNickFromId from "./getNickFromId.js";

async function getDayRanking(day) {
  const db = await openDB();
  const ranking = await db.all(
    `SELECT * FROM History WHERE day = ? ORDER BY summonerPoints DESC`,
    [day]
  );
  for (const summoner of ranking) {
    summoner.lastKnownNick =
      (await getNickFromId(summoner.summonerId)) || summoner.summonerId;
  }
  return ranking;
}

export default getDayRanking;
