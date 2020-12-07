const Sequelize = require("sequelize");
const dbConfig = require("./db.config");

const databaseName =
  "stacktrack" + process.env.NODE_ENV === "test" ? "test" : "";

const db = new Sequelize(dbConfig.db, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  logging: true,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
// console.log(db); || `postgres://localhost:5432/${databaseName}`

module.exports = db;
