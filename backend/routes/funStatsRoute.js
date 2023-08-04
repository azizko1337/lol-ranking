import getFunStats from "../controller/getFunStats.js";

async function funStatsRoute(req, res) {
  try {
    const funStats = await getFunStats();
    res.status(200).json({ funStats }).end();
  } catch (err) {
    res.status(500).json({ error: "Internal server error." }).end();
  }
}

export default funStatsRoute;
