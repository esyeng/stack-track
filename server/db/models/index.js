const User = require("./User");
const Team = require("./Team");
const Tag = require("./Tag");
const Project = require("./Project");
const Organization = require("./Organization");
const Message = require("./Message");
const Issue = require("./Issue");
const Comment = require("./Comment");

/**
 * ASSOCIATIONS
 *
 * - Organization -
 */

// done as of now: 7 / 21

// √
Organization.hasMany(Team); // - seed complete -

// - Team -
// √
Team.hasMany(User); // - seed complete -
// √
Team.hasMany(Project);
// - seed complete -
// √
Team.belongsTo(Organization); // - seed complete -

// - User -
// √
User.belongsToMany(Project, {
  through: "user-project",
  as: "contributor",
  foreignKey: "contributerId",
});
// - seed complete -

User.belongsToMany(Message, { through: "user-message", as: "sender" });
// √

Message.belongsToMany(User, {
  through: "user-message",
  as: "message",
});

// √
User.belongsTo(Team); // - seed complete -
// X

// - Project -
// √
Project.belongsTo(Team);
// √
Project.belongsToMany(User, { through: "user-project", as: "project" });
// - seed complete -

User.belongsToMany(Issue, {
  through: "tickets",
  as: "assignee",
});
// X
Issue.belongsToMany(User, {
  through: "tickets",
  as: "assigned",
});

Project.hasMany(Issue);

// - Issue -

// √
Issue.belongsTo(Project);
// X
// √
Issue.hasMany(Comment);
// X
Issue.hasMany(Tag);

// - Comment -
// √
Comment.belongsTo(Issue);
// √
Comment.belongsTo(User);

// - Tag -
// X
Tag.belongsTo(Issue);

module.exports = {
  User: User,
  Team: Team,
  Tag: Tag,
  Issue: Issue,
  Project: Project,
  Comment: Comment,
  Organization: Organization,
  Message: Message,
};
