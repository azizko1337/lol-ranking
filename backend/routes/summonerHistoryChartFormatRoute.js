import getSummonerHistoryChartFormat from "../controller/getSummonerHistoryChartFormat.js";
import getSavedDaysAsLabels from "../controller/getSavedDaysAsLabels.js";

async function summonerHistoryChartFormatRoute(req, res) {
  try {
    const { summonerId } = req.query;
    const datasets = [await getSummonerHistoryChartFormat(summonerId)];
    res
      .status(200)
      .json({
        labels: await getSavedDaysAsLabels,
        summonerHistoryChartFormat: { datasets },
      })
      .end();
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error." }).end();
  }
}

export default summonerHistoryChartFormatRoute;
