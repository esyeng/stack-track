const Sequelize = require("sequelize");
const db = require("../db");

const Project = db.define("project", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: Sequelize.TEXT('long'),
    allowNull: true,

  },
  category: {
    type: Sequelize.ENUM(
      "Web",
      "iOS",
      "Android",
      "macOS",
      "Windows",
      "Linux",
      "Utility"
    ),
    defaultValue: "Web",
  },
  dateCreated: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.ENUM(
      "Development",
      "Production",
      "Prototype",
      "Completed",
      "Cancelled"
    ),
    defaultValue: "Development",
  },
});

module.exports = Project;
