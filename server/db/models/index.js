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
    as: "projects",
    foreignKey: "contributorId",
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
// √

// - Project -
// √
Project.belongsTo(Team);
// √
Project.belongsToMany(User, { through: "user-project", as: "users", foreignKey: "user-proj-id" });
// - seed complete -

User.belongsToMany(Issue, {
    through: "tickets",
    as: "assignee",
});
// √
Issue.belongsToMany(User, {
    through: "tickets",
    as: "assigned",
});

Project.hasMany(Issue);

// - Issue -

// √
Issue.belongsTo(Project);
// √
// √
Issue.hasMany(Comment);
// √
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
