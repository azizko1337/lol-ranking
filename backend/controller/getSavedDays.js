import openDB from "../db/openDB.js";

async function getSavedDays() {
  const db = await openDB();
  let savedDays = await db.all(
    "SELECT DISTINCT day FROM history ORDER BY day ASC"
  );
  savedDays = savedDays.map((day) => {
    return day.day;
  });
  await db.close();
  return savedDays;
}

export default getSavedDays;
