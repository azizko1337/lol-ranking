import express from "express";
import bodyParser from "body-parser";
import schedule from "node-schedule";
import cors from "cors";
import config from "./config.js";
import refreshRanking from "./tasks/refreshRanking.js";
import saveRankingToHistory from "./tasks/saveRankingToHistory.js";
import addSummoners from "./tasks/addSummoners.js";
import initializeDB from "./db/initializeDB.js";
// routes
import rankingRoute from "./routes/rankingRoute.js";
import summonerHistoryChartRoute from "./routes/summonerHistoryChartFormatRoute.js";
import wholeHistoryChartFormatRoute from "./routes/wholeHistoryChartFormatRoute.js";
import savedDaysRoute from "./routes/savedDaysRoute.js";
import funStatsRoute from "./routes/funStatsRoute.js";

const app = express();
app.use(bodyParser.json());
app.use(cors(config.corsOptions));

//   ROUTES
app.get("/ranking", rankingRoute);
app.get("/summonerHistoryChartFormat", summonerHistoryChartRoute);
app.get("/wholeHistoryChartFormat", wholeHistoryChartFormatRoute);
app.get("/savedDays", savedDaysRoute);
app.get("/funStats", funStatsRoute);

app.listen(process.argv[2] || config.defaultPort, async () => {
  console.log(
    `Server is listening on port ${process.argv[2] || config.defaultPort}`
  );

  // INITIALIZE DATABASE
  await initializeDB();

  // INITIALIZE RANKING
  await addSummoners();
  await refreshRanking();
  app.locals.lastRefresh = Date.now();

  // REFRESH RANKING EVERY HOUR
  schedule.scheduleJob("0 * * * *", async () => {
    await addSummoners();
    await refreshRanking();
    app.locals.lastRefresh = Date.now();
  });

  // ADD RANKING TO HISTORY DATABASE EVERY DAY
  schedule.scheduleJob("3 0 * * *", async () => {
    await saveRankingToHistory();
  });
});
