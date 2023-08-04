import openDB from "../db/openDB.js";

async function getActiveSummoners() {
  const db = await openDB();
  const summoners = await db.all("SELECT * FROM Summoner");
  await db.close();
  return summoners;
}

export default getActiveSummoners;
