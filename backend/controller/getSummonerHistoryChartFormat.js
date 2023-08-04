import openDB from "../db/openDB.js";
import getNickFromId from "./getNickFromId.js";
import uniqolor from "uniqolor";

async function getSummonerHistoryChartFormat(summonerId) {
  const db = await openDB();
  const data = await db.all(
    "SELECT date(day/1000, 'unixepoch') AS x, summonerPoints AS y  FROM History WHERE summonerId = ? ORDER BY day ASC",
    summonerId
  );
  await db.close();
  return {
    id: summonerId,
    label: (await getNickFromId(summonerId)) || summonerId,
    backgroundColor: uniqolor(summonerId).color,
    data,
  };
}

export default getSummonerHistoryChartFormat;
