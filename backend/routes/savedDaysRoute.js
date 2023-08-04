import getSavedDays from "../controller/getSavedDays.js";

async function savedDaysRoute(req, res) {
  try {
    const savedDays = await getSavedDays();
    res.status(200).json({ savedDays }).end();
  } catch (err) {
    res.status(500).json({ error: "Internal server error." }).end();
  }
}

export default savedDaysRoute;
