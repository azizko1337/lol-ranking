import openDB from "../db/openDB.js";
import getSavedDaysAsLabels from "./getSavedDaysAsLabels.js";
import config from "../config.js";
import getSummonerHistoryChartFormat from "./getSummonerHistoryChartFormat.js";

async function getWholeHistoryChartFormat() {
  const { summoners } = config;
  const db = await openDB();

  const datasets = [];
  for (const summonerId of summoners) {
    const summonerHistoryChartFormat = await getSummonerHistoryChartFormat(
      summonerId
    );

    // default hidden to avoid lags on frontend :)
    if (summoners.length > 5) summonerHistoryChartFormat.hidden = true;

    datasets.push(summonerHistoryChartFormat);
  }

  await db.close();
  return { labels: await getSavedDaysAsLabels(), datasets };
}

export default getWholeHistoryChartFormat;
