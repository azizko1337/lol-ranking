import openDB from "../db/openDB.js";

async function addSummoner(summoner) {
  try {
    const db = await openDB();
    const {
      summonerId,
      summonerName,
      tier,
      rank,
      leaguePoints,
      wins,
      losses,
      summonerPoints,
    } = summoner;
    await db.run(
      "INSERT INTO Summoner (summonerId, lastKnownNick, tier, rank, leaguePoints, wins, losses, summonerPoints) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      summonerId,
      summonerName,
      tier,
      rank,
      leaguePoints,
      wins,
      losses,
      summonerPoints
    );
    await db.close();
    return true;
  } catch (err) {
    return false;
  }
}

export default addSummoner;
