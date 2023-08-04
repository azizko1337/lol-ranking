import config from "../config.js";
import addSummoner from "../controller/addSummoner.js";
import fetchSummonerById from "../riot_communication/fetchSummonerById.js";
import isSummonerInDb from "../controller/isSummonerInDb.js";

async function addSummoners() {
  const summonerIds = config.summoners;
  for (const summonerId of summonerIds) {
    if (await isSummonerInDb(summonerId)) continue;
    const summoner = await fetchSummonerById(summonerId);
    if (summoner == null) continue;
    await addSummoner(summoner);
  }
}

export default addSummoners;
