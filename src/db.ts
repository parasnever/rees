import mysql, { ConnectionOptions } from "mysql2";

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = Number(process.env.DB_PORT);
const database = process.env.DB_DATABASE;

const access: ConnectionOptions = {
  user: user,
  password: password,
  host: host,
  port: port,
  database: database,
};

const conn = mysql.createConnection(access);
