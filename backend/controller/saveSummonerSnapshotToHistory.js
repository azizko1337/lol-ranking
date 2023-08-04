import openDB from "../db/openDB.js";

async function saveSummonerSnapshotToHistory(summoner) {
  const db = await openDB();
  await db.run(
    "INSERT INTO History (summonerId, tier, rank, leaguePoints, wins, losses, summonerPoints, day) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      summoner.summonerId,
      summoner.tier,
      summoner.rank,
      summoner.leaguePoints,
      summoner.wins,
      summoner.losses,
      summoner.summonerPoints,
      new Date(new Date().toDateString()).getTime(),
    ]
  );
  await db.close();
}

export default saveSummonerSnapshotToHistory;
