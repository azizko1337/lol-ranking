const Logger = require("./Logger");
const NicksDb = require("./NicksDb");
const fetch = require("node-fetch");

class Ranking {
  constructor(API_KEY, ids) {
    this.API_KEY = API_KEY;
    this.ids = ids;
    this.ranking = [];
    this.nicks = {};
    this.update();
  }

  calculateSummonerPoints(tier, rank, lp) {
    let summonerPoints = lp;
    switch (rank) {
      case "V":
        summonerPoints += 0;
        break;
      case "IV":
        summonerPoints += 100;
        break;
      case "III":
        summonerPoints += 200;
        break;
      case "II":
        summonerPoints += 300;
        break;
      case "I":
        summonerPoints += 400;
        break;
      default:
        summonerPoints += 0;
        break;
    }
    switch (tier) {
      case "IRON":
        summonerPoints += 0;
        break;
      case "BRONZE":
        summonerPoints += 500;
        break;
      case "SILVER":
        summonerPoints += 1000;
        break;
      case "GOLD":
        summonerPoints += 1500;
        break;
      case "PLATINUM":
        summonerPoints += 2000;
        break;
      case "DIAMOND":
        summonerPoints += 2500;
        break;
      case "MASTER":
        summonerPoints += 3000;
        break;
      case "GRAND_MASTER":
        summonerPoints += 3500;
        break;
      case "CHALLENGER":
        summonerPoints += 4000;
        break;
      default:
        summonerPoints += 0;
        break;
    }

    return summonerPoints;
  }

  async fetchSummonerIdByNick(nick) {
    try {
      const res = await fetch(
        `https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nick}?api_key=${this.API_KEY}`,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36",
            "Accept-Language": "pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7",
            "Accept-Charset":
              "application/x-www-form-urlencoded; charset=UTF-8",
            Origin: "https://developer.riotgames.com",
          },
        }
      );
      const { id: summonerId } = await res.json();
      return summonerId;
    } catch (error) {
      const err = `Can't get id of nick ${nick}. Error: ` + error.message;
      Logger.write(err);
      return false;
    }
  }

  async fetchSummonerDataById(id) {
    try {
      const res = await fetch(
        `https://eun1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${this.API_KEY}`,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36",
            "Accept-Language": "pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7",
            "Accept-Charset":
              "application/x-www-form-urlencoded; charset=UTF-8",
            Origin: "https://developer.riotgames.com",
            cors: "cors",
          },
        }
      );
      let summonerData = await res.json();

      if (typeof summonerData[Symbol.iterator] === "function") {
        for (const singleSummonerData of summonerData) {
          if (singleSummonerData.queueType === "RANKED_SOLO_5x5") {
            const {
              summonerId,
              tier,
              rank,
              leaguePoints,
              wins,
              losses,
              summonerName,
            } = singleSummonerData;
            const summonerPoints = this.calculateSummonerPoints(
              tier,
              rank,
              leaguePoints
            );

            // update nicks and id object
            NicksDb.set(summonerId, summonerName);

            summonerData = {
              summonerId,
              tier,
              rank,
              leaguePoints,
              summonerName,
              wins,
              losses,
              summonerPoints,
            };
            return summonerData;
          }
        }
        return false;
      } else {
        throw new Error("");
      }
    } catch (error) {
      const err = `Can't fetch data of id ${id}. Error: ` + error.message;
      Logger.write(err);
      return false;
    }
  }

  sort(ranking) {
    const sortedRanking = ranking;

    // sort ranking by sum of LP
    sortedRanking.sort((a, b) => {
      if (a.summonerPoints > b.summonerPoints) {
        return -1;
      }
      if (a.summonerPoints > b.summonerPoints) {
        return 1;
      }
      return 0;
    });

    return sortedRanking;
  }

  async update() {
    try {
      Logger.write(`Updating ranking...`);
      let newRanking = [];
      for (const id of this.ids) {
        const summonerData = await this.fetchSummonerDataById(id);
        summonerData ? newRanking.push(summonerData) : null;
      }
      newRanking = this.sort(newRanking);
      this.ranking = newRanking;
      Logger.write(`Ranking has been updated...`);
      return true;
    } catch (error) {
      Logger.write("Error while updating ranking: " + error.message);
    }
  }

  get() {
    return this.ranking;
  }
}

module.exports = Ranking;
