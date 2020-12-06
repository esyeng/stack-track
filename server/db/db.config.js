let host;

process.env.NODE_ENV === "production"
  ? (host = process.env.DATABASE_URL)
  : (host = "localhost");

module.exports = {
  HOST: host,
  USER: process.env.DATABASE_ADMIN.username,
  PASSWORD: process.env.DATABASE_ADMIN.password,
  DB: process.env.DATABASE_ADMIN.db,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
