const { parse } = require("url");
const { Pool } = require("pg");
require("dotenv").config();

const DB_URL =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_DB_URL
    : process.env.DB_URL;

if (!DB_URL) throw new Error("Enviroment variable DB_URL must be set");

const { auth, hostname: host, port, pathname } = parse(process.env.DB_URL);
const [user, password] = auth.split(":");

const options = {
  host,
  port,
  database: pathname.split("/")[1],
  max: 2,
  user,
  password,
  ssl: host !== "localhost",
};

module.exports = new Pool(options);
