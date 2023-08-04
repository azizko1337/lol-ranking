import fetch from "node-fetch";
import updateNick from "../controller/updateNick.js";
import calculateSummonerPoints from "../utils/calculateSummonerPoints.js";
import config from "../config.js";

async function fetchSummonerDataById(summonerId) {
  const { API_KEY } = config;
  try {
    const res = await fetch(
      `https://eun1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${API_KEY}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36",
          "Accept-Language": "pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7",
          "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
          Origin: "https://developer.riotgames.com",
          cors: "cors",
        },
      }
    );
    let queuesData = await res.json();

    if (!typeof queuesData[Symbol.iterator] === "function") {
      throw new Error("No rank data available.");
    }

    for (const queue of queuesData) {
      if (queue.queueType === "RANKED_SOLO_5x5") {
        const {
          summonerId,
          tier,
          rank,
          leaguePoints,
          wins,
          losses,
          summonerName,
        } = queue;

        //   update last known nick
        await updateNick(summonerId, summonerName);

        return {
          summonerId,
          tier,
          rank,
          leaguePoints,
          wins,
          losses,
          summonerPoints: calculateSummonerPoints(tier, rank, leaguePoints),
          summonerName,
        };
      }
    }
    throw new Error("No ranked solo 5x5 data available.");
  } catch (error) {
    return null;
  }
}

export default fetchSummonerDataById;
