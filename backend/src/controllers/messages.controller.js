import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../models/Message.model.js";

export const getMessages = async (req, res) => {
  const { id } = req.params;
  const myId = req.user.profileId;
  try {
    const messages = await Message.find({
      $or: [
        { from: myId, to: id },
        { from: id, to: myId },
      ],
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const sendMessage = async (req, res) => {
  try {
    const { to, text } = req.body;
    const from = req.user.profileId;
    const message = new Message({ from, to, text });
    await message.save();
    res.json(message);
    const receiverSocketId = getReceiverSocketId(to);
    if (receiverSocketId) io.to(receiverSocketId).emit("newMessage", message);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
