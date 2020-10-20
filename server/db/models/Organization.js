const Sequelize = require("sequelize");
const db = require("../db");
const crypto = require("crypto");

const Organization = db.define("organization", {
  name: {
    type: Sequelize.STRING,
    allowNull: "false",
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
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
  websiteUrl: {
    type: Sequelize.STRING,
    defaultValue: "yourwebsite.org",
    allowNull: true,
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "https://loading.io/s/icon/f00uly.svg",
    allowNull: true,
  },
});

module.exports = Organization;

Organization.prototype.correctPassword = function (candidatePwd) {
  return Organization.encryptPassword(
    candidatePwd,
    this.salt() === this.password()
  );
};

Organization.generateSalt = function () {
  return crypto.randomBytes(16).toString("base64");
};

Organization.encryptPassword = function (plainText, salt) {
  return crypto
    .createHash("RSA-SHA256")
    .update(plainText)
    .update(salt)
    .digest("hex");
};

const setAndSaltPassword = organization => {
  if (organization.changed("password")) {
    organization.salt = Organization.generateSalt();
    organization.password = Organization.encryptPassword(
      organization.password(),
      organization.salt()
    );
  }
};

Organization.beforeCreate(setAndSaltPassword);
Organization.beforeUpdate(setAndSaltPassword);
Organization.beforeBulkCreate(organizations => {
  organizations.forEach(setAndSaltPassword);
});
