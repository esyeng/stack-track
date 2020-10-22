const Sequelize = require("sequelize");
const db = require("../db");

const Comment = db.define("comment", {
  dateSent: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

module.exports = Comment;
