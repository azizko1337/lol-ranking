import openDB from "../db/openDB.js";

async function getSavedDaysAsLabels() {
  const db = await openDB();
  let savedDaysAsLabels = await db.all(
    "SELECT DISTINCT DATE(day/1000, 'unixepoch') AS 'day' FROM history ORDER BY day ASC"
  );
  savedDaysAsLabels = savedDaysAsLabels.map((day) => {
    return day.day;
  });
  await db.close();
  return savedDaysAsLabels;
}

export default getSavedDaysAsLabels;
