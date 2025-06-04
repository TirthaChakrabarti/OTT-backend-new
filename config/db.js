// import mysql from "mysql2/promise";
// import dotenv from "dotenv";

// dotenv.config();

// Creating a pool of connections that can be reused
// export const db = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

const { Sequelize } = require("sequelize");
const config = require("./config")[process.env.NODE_ENV || "development"];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port || 3306,
    dialect: config.dialect,
    logging: config.logging,
  }
);

module.exports = sequelize;
