import generateTOken from "../config/jsonwebtoken.js";
import { User } from "../model/user.model.js";
import asyncHandler from "express-async-handler";

export async function register(req, res) {
  try {
    const { name, email, password, pic } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send("please your deatails");
    }
    const useremail = await User.find({
      email: email,
    });
    if (useremail.length != 0) {
      return res.status(400).send("Email already exists");
    }

    const newuser = new User({
      name: name,
      email: email,
      password: password,
      pic: pic,
    });
    await newuser.save();

    res.cookie("auth_token", generateTOken(newuser._id), {
      maxAge: 90000000,
      httpOnly: true,
    });

    return res.status(200).json({
      userId: newuser._id,
      email: newuser.email,
      name: newuser.name,
      pic: newuser.pic,
      token: generateTOken(newuser._id),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("please fill ur detals");
    }
    const user = await User.findOne({
      $or: [{ email: email }],
    });
    if (!user) {
      return res.status(404).send("No user with provided credentials found");
    }

    res.cookie("auth_token", generateTOken(user._id), {
      maxAge: 90000000,
      httpOnly: true,
    });

    res.status(200).json({
      username: user.username,
      useremail: user.email,
      token: generateTOken(user._id),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
}

export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (user) {
    res.status(200).json({
      name: user.name,
      email: user.email,
      pic: user.pic,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

export const allUser = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({
    _id: { $ne: req.user.user_id },
  });
  res.send(users);
});
