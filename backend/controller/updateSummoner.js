import openDB from "../db/openDB.js";

async function updateSummoner(summoner) {
  const db = await openDB();
  await db.run(
    "UPDATE Summoner SET tier = ?, rank = ?, leaguePoints = ?, wins = ?, losses = ?, summonerPoints = ? WHERE summonerId = ?",
    [
      summoner.tier,
      summoner.rank,
      summoner.leaguePoints,
      summoner.wins,
      summoner.losses,
      summoner.summonerPoints,
      summoner.summonerId,
    ]
  );
  await db.close();
}

export default updateSummoner;
