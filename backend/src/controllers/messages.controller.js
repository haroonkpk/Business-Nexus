import Message from "../models/Message.model.js";

export const getMessages = async (req, res) => {
  const { id1, id2 } = req.params;
  const messages = await Message.find({
    $or: [
      { from: id1, to: id2 },
      { from: id2, to: id1 },
    ],
  }).sort({ timestamp: 1 });

  res.json(messages);
};
export const sendMessage = async (req, res) => {
  const { from, to, text } = req.body;
  const message = new Message({ from, to, text });
  await message.save();
  res.json(message);
};
