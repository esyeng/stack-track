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

Organization.hasMany(Team); // - seed complete -

// - Team -

Team.hasMany(User); // - seed complete -
Team.hasMany(Project);
Team.belongsTo(Organization); // - seed complete -

// - User -

User.hasMany(Project);
User.hasMany(Comment);
User.belongsToMany(Message, { through: "chat", as: "sender" });
User.belongsToMany(Message, { through: "chat", as: "receiver" });
User.belongsTo(Team); // - seed complete -
User.belongsToMany(Issue, { through: "user-issue", as: "user" });

// - Project -

Project.belongsTo(Team);
Project.belongsToMany(User, { through: "user-project", as: "project" });
Project.hasMany(Issue);

// - Issue -

Issue.belongsTo(Project);
Issue.belongsToMany(User, { through: "user-issue", as: "issue" });
Issue.hasMany(Comment);
Issue.hasMany(Tag);

// - Comment -

Comment.belongsTo(Issue);
Comment.belongsTo(User);

// - Tag -

Tag.belongsTo(Issue);

// - Message -

Message.belongsTo(User, { through: "chat", as: "message" });

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
