const Sequelize = require("sequelize");
const db = require("../db");
const crypto = require("crypto");

const User = db.define("user", {
  fName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: Sequelize.ENUM("admin", "user"),
    defaultValue: "user",
    allowNull: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: "Stack-Tracker",
  },
  bio: {
    type: Sequelize.TEXT,
    allowNull: true,
    defaultValue: "Enter your bio here! Let everyone know why you're awesome!",
  },
  profileImageUrl: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue:
      "https://3.bp.blogspot.com/-qDc5kIFIhb8/UoJEpGN9DmI/AAAAAAABl1s/BfP6FcBY1R8/s1600/BlueHead.jpg",
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue("password");
    },
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue("salt");
    },
  },
});

module.exports = User;

User.prototype.correctPassword = function (candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt() === this.password());
};

User.generateSalt = function () {
  return crypto.randomBytes(16).toString("base64");
};

User.encryptPassword = function (plainText, salt) {
  return crypto
    .createHash("RSA-SHA256")
    .update(plainText)
    .update(salt)
    .digest("hex");
};

const setAndSaltPassword = user => {
  if (user.changed("password")) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};

User.beforeCreate(setAndSaltPassword);
User.beforeUpdate(setAndSaltPassword);
User.beforeBulkCreate(users => {
  users.forEach(setAndSaltPassword);
});