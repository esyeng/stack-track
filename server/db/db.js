const Sequelize = require("sequelize");

const databaseName =
  "stacktrack" + process.env.NODE_ENV === "test" ? "test" : "";
const db = new Sequelize(`postgres://localhost:5432/${databaseName}`, {
  logging: true,
});

module.exports = db;
