const express = require("express");
const path = require("path");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () =>
  console.log(`tracking stacks on ${PORT}`)
);
const io = require("socket.io")(server);

module.exports = app;

require("./socket")(io);
// pull in api keys as needed
// if (process.env.NODE_ENV !== "production") require("../secrets");

// logware
app.use(morgan("dev"));

// body parse mdwre
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/auth", require("./auth"));
// app.use("/api", require("./api"));

app.use((req, res, next) =>
  path.extname(req.path).length > 0 ? res.status(404).send("Not found") : next()
);

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public.index.html"));
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error");
});

app.use(express.static(path.join(__dirname, "..", "public")));
