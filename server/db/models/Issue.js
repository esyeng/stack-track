const Sequelize = require("sequelize");
const db = require("../db");

const Issue = db.define("issue", {
  ticketNumber: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  category: {
    type: Sequelize.ENUM("bug", "task", "feature", "report"),
    allowNull: true,
    defaultValue: "bug",
  },
  status: {
    type: Sequelize.ENUM("open", "in progress", "closed"),
    allowNull: false,
    defaultValue: "open",
  },
});

module.exports = Issue;
