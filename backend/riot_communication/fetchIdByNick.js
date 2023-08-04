import fetch from "node-fetch";
import config from "../config.js";

async function fetchIdByNick(nick) {
  const { API_KEY } = config;
  try {
    const res = await fetch(
      `https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nick}?api_key=${API_KEY}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36",
          "Accept-Language": "pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7",
          "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
          Origin: "https://developer.riotgames.com",
        },
      }
    );
    const { id: summonerId } = await res.json();
    return summonerId;
  } catch (error) {
    return null;
  }
}

export default fetchIdByNick;
