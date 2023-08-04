import getRanking from "../controller/getRanking.js";
import getDayRanking from "../controller/getDayRanking.js";

async function rankingRoute(req, res) {
  try {
    const day = req.query.day;
    if (day && +day !== new Date(new Date().toDateString()).getTime()) {
      const ranking = await getDayRanking(day);
      res
        .status(200)
        .json({ lastRefresh: req.app.locals.lastRefresh || null, ranking })
        .end();
    } else {
      const ranking = await getRanking();
      res
        .status(200)
        .json({ lastRefresh: req.app.locals.lastRefresh || null, ranking })
        .end();
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error." }).end();
  }
}

export default rankingRoute;
