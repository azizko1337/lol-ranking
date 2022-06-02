const fs = require("fs/promises");
const NicksDb = require("./NicksDb");
const s2c = require("string-to-color");

class HistoryDb {
  static async read() {
    try {
      let history = await fs.readFile("./db/history.json", "utf8");
      history = JSON.parse(history);

      return history;
    } catch (error) {
      console.log("Error while reading database: " + error.message);
      return {};
    }
  }

  static async add(date, snapshot) {
    try {
      let history = await this.read();
      history.labels?.push(date);
      history.data?.push(snapshot);
      history = JSON.stringify(history);
      fs.writeFile("./db/history.json", history);
      return true;
    } catch (error) {
      console.log("Error while saving to database: " + error.message);
      return false;
    }
  }

  static async getChart() {
    const history = await this.read();
    const data = {
      labels: [],
      datasets: [],
    };

    history.labels.forEach((label) => {
      data.labels.push(label);
    });

    const players = {};
    history.data.forEach((dailyRanking) => {
      dailyRanking.forEach((player) => {
        if (players[player.summonerId]) {
          players[player.summonerId].push(player.summonerPoints);
        } else {
          players[player.summonerId] = [player.summonerPoints];
        }
      });
    });

    for (const [player, points] of Object.entries(players)) {
      while (points.length < data.labels.length) {
        points.unshift(0);
      }

      const playerColor = s2c(player);
      data.datasets.push({
        label: await NicksDb.get(player),
        data: points,
        borderColor: playerColor,
        borderWidth: 2,
        backgroundColor: playerColor,
      });
    }

    return data;
  }
}

module.exports = HistoryDb;
