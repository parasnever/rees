import dotenv from "dotenv";
import { readFileSync } from "fs";

dotenv.config();

import mysql, { ConnectionOptions } from "mysql2";

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = Number(process.env.DB_PORT);
const database = process.env.DB_DATABASE;

console.log(
  "env variable loaded from .env file",
  user,
  password,
  port,
  database,
  host
);

const access: ConnectionOptions = {
  user: user,
  password: password,
  host: host,
  port: port,
  database: database,
};

console.log("process cwd", process.cwd());
const file = readFileSync(`${process.cwd()}/src/migrations/note-table.sql`);

const fileContent = file.toString();
console.log("filecontent", fileContent);

const conn = mysql.createConnection(access);

conn.query(fileContent, (err, result) => {
  if (err) {
    console.error("Failed to run the command", err);
  } else {
    console.log("result", result);
  }
});
