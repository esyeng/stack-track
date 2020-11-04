const Sequelize = require("sequelize");
const dbConfig = require("./db.config");


// pg.defaults.password = "l0b5t3r";
// console.log(pg);


const db = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});



module.exports = db;

if (process.env.NODE_ENV === "test") {
  after("close db connection", () => db.close());
}
