let host;

process.env.NODE_ENV === "production"
  ? (host = process.env.DATABASE_URL)
  : (host = "localhost");

module.exports = {
  HOST: host,
  USER: process.env.DB_ADMIN.username,
  PASSWORD: process.env.DB_ADMIN.password,
  DB: process.env.DB_ADMIN.db,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
