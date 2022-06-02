const express = require("express");
const bodyParser = require("body-parser");
const schedule = require("node-schedule");
const path = require("path");
const cfg = require("./config");
const HistoryDb = require("./libs/HistoryDb");
const NicksDb = require("./libs/NicksDb");
const IdsDb = require("./libs/IdsDb");
const Ranking = require("./libs/Ranking");
const Logger = require("./libs/Logger");

async function server() {
  let ranking = new Ranking(cfg.API_KEY, await IdsDb.read());

  const app = express();
  app.use(bodyParser.json());

  //   ROUTES
  app.use("/", express.static(path.join(__dirname, "public")));
  app.get("/api/history", async (req, res) => {
    res
      .status(200)
      .json(await HistoryDb.read())
      .end();
  });
  app.get("/api/ranking", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(ranking.ranking).end();
  });
  app.get("/api/chart", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res
      .status(200)
      .json(await HistoryDb.getChart())
      .end();
  });
  // app.get("/api/admin", async (req, res) => {
  //   res
  //     .status(200)
  //     .json(await IdsDb.read())
  //     .end();
  // });
  // app.post("/api/admin", async (req, res) => {
  //   const password = req.body?.password;
  //   if (password === cfg.ADMIN_PASSWORD) {
  //     const nicks = req.body?.nicks;
  //     Logger.write(`Someone updated nicks to ${JSON.stringify(nicks)}`);
  //     nicksDb.save(JSON.stringify(nicks));
  //     res
  //       .status(200)
  //       .json(await nicksDb.read())
  //       .end();
  //     ranking.nicks = await nicksDb.read();
  //   } else {
  //     res.status(403).json({ error: true, message: "Wrong password" }).end();
  //   }
  // });

  app.listen(cfg.PORT, () => {
    Logger.write(`Server is listening on port ${cfg.PORT}`);

    // REFRESH RANKING EVERY HOUR
    Logger.write(`Every hour scheduler started`);
    schedule.scheduleJob("0 * * * *", ranking.update.bind(ranking));

    // ADD RANKING TO HISTORY DATABASE EVERYDAY
    Logger.write(`Every day scheduler started`);
    schedule.scheduleJob("3 0 * * *", () => {
      const now = new Date();
      HistoryDb.add(
        `${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()}`,
        ranking.ranking
      );
    });
  });
}
server();
