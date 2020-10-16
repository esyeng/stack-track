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

app.get("/", (req, res) => {
  res.send("Nice");
});

app.use(express.static(path.join(__dirname, "..", "public")));
