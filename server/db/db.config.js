let host;

process.env.NODE_ENV === "production"
  ? (host = process.env.DATABASE_URL)
  : (host = "localhost");

const { dbAdmin } = require("../../secret.js");

module.exports = {
  HOST: host,
  USER: dbAdmin.username,
  PASSWORD: dbAdmin.password,
  DB: dbAdmin.db,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
