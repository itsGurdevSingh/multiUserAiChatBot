const chatModel = require("../models/chat.model")
const messageModel = require("../models/message.model")

const createChat = async (req, res) => {
    const title = req.body.title || 'untitled chat '

    try {
        const chat = await chatModel.create({ user: req.user._id, title })

        res.status(201).json({ _id: chat._id,title:chat.title,createdAt:chat.createdAt })
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: 'failed to create chat' })
    }

}

const getChats = async (req, res) => {
  const user = req.user;

  try {
    const chats = await chatModel
      .find({ user: user._id })
      .select("title createdAt") // include fields you want
      .sort({ createdAt: -1 });  // sort newest first

    res.status(200).json({ chats });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get chats.",
      error: error.message,
    });
  }
};
const getConversation = async (req, res) => {
  const chatId = req.params.id;

  try {
  const conversation = await messageModel
      .find({ chatId})
      .select("role content createdAt") 
      .sort({ createdAt: 1 })

    res.status(200).json({ conversation });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get conver sation ",
      error: error.message,
    });
  }
};


module.exports = {
    createChat,
    getChats,
    getConversation
}