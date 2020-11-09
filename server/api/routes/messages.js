const messages = require("express").Router();
const { Message, User } = require("../../db/models");
module.exports = messages;

// Pull in all messages

messages.get("/:userId", async (req, res, next) => {
    try {
        const { userId } = req.params;
        const allMsg = await User.findByPk(userId, {
            include: {
                model: Message,
                through: "user-message",
                as: "sender",
            }
        });
        res.json(allMsg);
    } catch (err) {
        next(err);
    }
})

messages.post("/:toId", async (req, res, next) => {
    try {
        const { toId } = req.params;
        const sendTo = await User.findByPk(toId);
        const { body, timestamp } = req.body;
        const newMsg = await Message.create({
            body: body,
            timestamp: timestamp
        })
        await newMsg.addMessage(sendTo);
        res.json(newMsg);
    } catch (err) {
        next(err);
    }
});

// delete one msg
messages.delete("/:msgId", async (req, res, next) => {
    try {
        const { msgId } = req.params;
        await Message.destroy({
            where: {
                id: msgId
            }
        });
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
});

// delete all user msg ...