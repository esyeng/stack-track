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
User.belongsToMany(Project, { through: "user-project", as: "owner" });
// - seed complete -

User.belongsToMany(Message, { through: "user-message", as: "sender" });
// √

Message.belongsToMany(User, { through: "user-message", as: "received" });

// √
User.belongsTo(Team); // - seed complete -
// X
User.belongsToMany(Issue, { through: "user-issue", as: "user" });

// - Project -
// √
Project.belongsTo(Team);
// √
Project.belongsToMany(User, { through: "user-project", as: "project" });
// - seed complete -

// X

Project.hasMany(Issue);

// - Issue -

// X
Issue.belongsTo(Project);
// X
Issue.belongsToMany(User, { through: "user-issue", as: "issue" });
// X
Issue.hasMany(Comment);
// X
Issue.hasMany(Tag);

// - Comment -
// X
Comment.belongsTo(Issue);
// X
Comment.belongsTo(User);

// - Tag -
// X
Tag.belongsTo(Issue);

// - Message -
// X
// Message.belongsTo(User, { through: "chat", as: "message" });

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
