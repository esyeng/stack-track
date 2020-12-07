const dbInfo = require("../../secret");

module.exports = {
  HOST: dbInfo.HOST,
  USER: dbInfo.USER,
  PASSWORD: dbInfo.PASSWORD,
  DB: dbInfo.DB,
  dialect: "postgresql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
