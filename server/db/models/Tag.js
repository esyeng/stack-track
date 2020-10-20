const Sequelize = require("sequelize");
const db = require("../db");

const Tag = db.define("tag", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Tag;
