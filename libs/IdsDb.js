const fs = require("fs/promises");
const Logger = require("./Logger");

class IdsDb {
  static async read() {
    try {
      let ids = await fs.readFile("./db/ids.json", "utf8");
      ids = JSON.parse(ids);
      return ids;
    } catch (error) {
      const err = "Error while reading ids database: " + error.message;
      Logger.write(err);
      return {};
    }
  }

  static async replace(ids) {
    try {
      await fs.writeFile("./db/ids.json", JSON.stringify(ids));
      return true;
    } catch (error) {
      const err = "Error while saving to ids database: " + error.message;
      Logger.write(err);
      return false;
    }
  }

  static async addId(id) {
    try {
      if (typeof id !== "string" || id.length > 100) {
        throw new Error("Wrong summoner ID!");
      }
      let ids = await this.read();
      ids.push(id);
      await this.replace(ids);
      return true;
    } catch (error) {
      const err = "Error while saving to ids database: " + error.message;
      Logger.write(err);
      return false;
    }
  }

  static async removeId(id) {
    try {
      let ids = await this.read();
      const indexToRemove = ids.indexOf(id);
      if (indexToRemove === -1) {
        throw new Error(`Not found ${id} summoner ID in databse to remove.`);
      }
      ids.splice(indexToRemove, 1);
      await this.replace(ids);
      return true;
    } catch (error) {
      const err = "Error while saving to ids database: " + error.message;
      Logger.write(err);
      return false;
    }
  }
}

module.exports = IdsDb;
