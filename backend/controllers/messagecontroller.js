import asyncHandler from "express-async-handler";
import { Message } from "../model/message.model.js";
import { User } from "../model/user.model.js";
import { chatModel } from "../model/chatModel.model..js";

export const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic");
    message = await message.populate("chat", "name pic");
    message.chat = await User.populate(message.chat, {
      path: "users",
      select: "name pic email",
    });

    await chatModel.findByIdAndUpdate(chatId, {
      latestMessage: message,
    });
    res.status(201).json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

export const allUserChat = asyncHandler(async (req, res) => {
  try {
    const chats = await chatModel
      .find({ users: req.user._id })
      .populate("users", "-password")
      .populate({
        path: "latestMessage",
        populate: {
          path: "sender",
          select: "name email", // Select the fields you want to display from the user
        },
      });

    // Filter out the current user from the users array
    const filteredChats = chats.map((chat) => {
      const chatObject = chat.toObject();
      chatObject.users = chatObject.users.filter(
        (user) => !user._id.equals(req.user._id)
      );
      return chatObject;
    });

    res.status(200).send(filteredChats);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export const allMessage = asyncHandler(async (req, res) => {
  try {
    const message = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
