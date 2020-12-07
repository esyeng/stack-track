const db = require("./db");

// register models
const {
  User,
  Issue,
  Message,
  Project,
  Team,
  Tag,
  Organization,
  Comment,
} = require("./models");

module.exports = {
  User: User,
  Issue: Issue,
  Message: Message,
  Project: Project,
  Team: Team,
  Tag: Tag,
  Organization: Organization,
  Comment: Comment,
  db: db,
};
