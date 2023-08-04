import openDB from "../db/openDB.js";
import getNickFromId from "./getNickFromId.js";

async function getFunStats() {
  const db = await openDB();
  const funStats = {};
  funStats.highestRanking = await db.get(
    "SELECT * FROM History WHERE summonerPoints = (SELECT MAX(summonerPoints) FROM History) ORDER BY day DESC"
  );
  funStats.lowestRanking = await db.get(
    "SELECT * FROM History WHERE summonerPoints = (SELECT MIN(summonerPoints) FROM History) ORDER BY day DESC"
  );
  funStats.bestWR = await db.get(
    "SELECT * FROM History WHERE wins*1.0/(wins+losses) = (SELECT MAX(wins*1.0/(wins+losses)) FROM History) ORDER BY day DESC"
  );
  funStats.worstWR = await db.get(
    "SELECT * FROM History WHERE wins*1.0/(wins+losses) = (SELECT MIN(wins*1.0/(wins+losses)) FROM History) ORDER BY day DESC"
  );

  funStats.longestOnFirstPlace = await db.get(
    `
    SELECT COUNT(summonerId) AS 'daysOnFirstPlace', summonerId
    FROM (
      SELECT *
      FROM (
          SELECT *, ROW_NUMBER() OVER (PARTITION BY day ORDER BY summonerPoints DESC) AS n
          FROM History
      ) AS x
      WHERE n <= 1
    ) AS y
    GROUP BY summonerId
    ORDER BY daysOnFirstPlace DESC
    LIMIT 1
    `
  );

  for (const stat in funStats) {
    const summonerHistory = funStats[stat];
    const { summonerId } = summonerHistory;
    summonerHistory.lastKnownNick =
      (await getNickFromId(summonerId)) || summonerId;
  }
  await db.close();
  return funStats;
}

export default getFunStats;
