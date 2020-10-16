const Message = require("../db/models/Message");
const Chat = require("../db/models/Chat");

module.exports = io => {
  io.on("connection", socket => {
    console.log(socket.id, "now connected");

    socket.on("new-message", message => {
      socket.emit("new-message", message);
    });

    socket.on("new-chat", chat => {
      socket.emit("new-chat", chat);
    });
  });
};
