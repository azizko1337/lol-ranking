const fs = require("fs/promises");
const Logger = require("./Logger");

class NicksDb {
  static async read() {
    try {
      let nicks = await fs.readFile("./db/nicks.json", "utf8");
      nicks = JSON.parse(nicks);
      return nicks;
    } catch (error) {
      Logger.write("Error while reading nicks database: " + error.message);
      return {};
    }
  }

  static async replace(nicks) {
    try {
      await fs.writeFile("./db/nicks.json", JSON.stringify(nicks));
      return true;
    } catch (error) {
      Logger.write("Error while saving to nicks database: " + error.message);
      return false;
    }
  }

  static async get(id) {
    try {
      const nicks = await this.read();
      return nicks[id];
    } catch (error) {
      Logger.write(`Error while getting nick of id ${id}: ` + error.message);
      return false;
    }
  }

  static async set(id, nick) {
    try {
      const nicks = await this.read();
      nicks[id] = nick;
      await this.replace(nicks);
      return true;
    } catch (error) {
      Logger.write(
        `Error while setting nick of id ${id} to ${nick}: ` + error.message
      );
      return false;
    }
  }
}

module.exports = NicksDb;
