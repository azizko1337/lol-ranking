import sqlite3 from "sqlite3";
import { open } from "sqlite";

async function openDB() {
  return open({
    filename: process.cwd() + "/db/history.sqlite",
    driver: sqlite3.Database,
  });
}

export default openDB;
