const Sequelize = require("sequelize");

const databaseName =
  "stacktrack" + (process.env.NODE_ENV === "test" ? "-test" : "");

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  {
    logging: false,
  }
);
module.exports = db;

if (process.env.NODE_ENV === "test") {
  after("close db connection", () => db.close());
}
