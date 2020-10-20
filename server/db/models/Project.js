const Sequelize = require("sequelize");
const db = require("../db");

const Project = db.define("project", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true,
    defaultValue: "Project description",
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
    type: Sequelize.DATEONLY,
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
