import getWholeHistoryChartFormat from "../controller/getWholeHistoryChartFormat.js";
import getSavedDays from "../controller/getSavedDays.js";

async function wholeHistoryChartFormatRoute(req, res) {
  try {
    const wholeHistoryChartFormat = await getWholeHistoryChartFormat();
    res.status(200).json({ wholeHistoryChartFormat }).end();
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error." }).end();
  }
}

export default wholeHistoryChartFormatRoute;
