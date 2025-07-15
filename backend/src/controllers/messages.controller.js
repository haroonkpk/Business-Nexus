import Message from "../models/Message.model.js";

export const getMessages = async (req, res) => {
  const { id } = req.params;
  const myId = req.user.profileId;
  const messages = await Message.find({
    $or: [
      { from: myId, to: id },
      { from: id, to: myId },
    ],
  }).sort({ timestamp: 1 });

  res.json(messages);
};
export const sendMessage = async (req, res) => {
  const { to, text } = req.body;
  const from = req.user.profileId;
  const message = new Message({ from, to, text });
  await message.save();
  res.json(message);
};
