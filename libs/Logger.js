const fs = require("fs/promises");
const path = require("path");

class Logger {
  static write(...lines) {
    try {
      const now = new Date().toLocaleString();
      lines.forEach(async (line) => {
        console.log(line);
        const effect = await fs.appendFile(
          path.join(process.cwd(), "./logs.txt"),
          `[${now}] ${line} \n`
        );
      });
    } catch (error) {
      console.log(`LOGGER ERROR: ${error} `);
    }
  }
}

module.exports = Logger;
