import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { User } from "../model/user.model.js";
export const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded._id).select("-password");

      if (!user) {
        return res.status(401).json({ message: "Not authorized, no user" });
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(401);
    }
  }
  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
});
