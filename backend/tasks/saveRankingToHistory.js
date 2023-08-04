import saveSummonerSnapshotToHistory from "../controller/saveSummonerSnapshotToHistory.js";
import getActiveSummoners from "../controller/getActiveSummoners.js";

async function saveRankingToHistory() {
  const summoners = await getActiveSummoners();
  for (const summoner of summoners) {
    await saveSummonerSnapshotToHistory(summoner);
  }
}

export default saveRankingToHistory;
