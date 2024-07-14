import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import errorHandler from "../utils/error.js";

const getMessages = async (req, res, next) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");
    if (!conversation) return res.status(200).json([]);
    const messages = conversation.messages;
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

const sendMessages = async (req, res, next) => {
  try {
    const { _id: senderId } = req.user;
    const { id: receiverId } = req.params;
    const { message } = req.body;
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    conversation.messages.push(newMessage._id);
    await Promise.all([conversation.save(), newMessage.save()]);
    res.status(201).json(newMessage);
  } catch (error) {
    next(error);
  }
};

export { sendMessages, getMessages };
