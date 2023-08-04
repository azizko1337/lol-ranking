import openDB from "./openDB.js";

async function initializeDB() {
  const db = await openDB();
  await db.run(
    "CREATE TABLE IF NOT EXISTS Summoner (summonerId TEXT PRIMARY KEY, lastKnownNick TEXT, tier TEXT, rank TEXT, leaguePoints INTEGER, wins INTEGER, losses INTEGER, summonerPoints INTEGER)"
  );
  await db.run(
    "CREATE TABLE IF NOT EXISTS History (id INTEGER PRIMARY KEY AUTOINCREMENT, day TIMESTAMP, summonerId TEXT, tier TEXT, rank TEXT, leaguePoints INTEGER, wins INTEGER, losses INTEGER, summonerPoints INTEGER, FOREIGN KEY(summonerId) REFERENCES Summoner(summonerId))"
  );
  await db.close();
}

export default initializeDB;
