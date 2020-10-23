const Sequelize = require("sequelize");
const db = require("../db");
const User = require("./User");

const Message = db.define("message", {
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  timestamp: {
    type: Sequelize.STRING,
  },
});

module.exports = Message;
