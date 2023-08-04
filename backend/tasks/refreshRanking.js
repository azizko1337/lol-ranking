import getActiveSummoners from "../controller/getActiveSummoners.js";
import fetchSummonerById from "../riot_communication/fetchSummonerById.js";
import updateSummoner from "../controller/updateSummoner.js";

async function refreshRanking() {
  const summoners = await getActiveSummoners();
  for (const summoner of summoners) {
    const updatedSummoner = await fetchSummonerById(summoner.summonerId);
    if (updatedSummoner == null) continue;
    await updateSummoner(updatedSummoner);
  }
}

export default refreshRanking;
