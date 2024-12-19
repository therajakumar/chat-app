import { Router } from "express";
import {
  register,
  login,
  getUser,
  allUser,
} from "../controllers/usercontrollers.js";
import { protect } from "../middleware/authMiddleware.js";

const authrouter = Router();

authrouter.route("/").get(protect, allUser);
authrouter.route("/register").post(register);
authrouter.route("/login").post(login);
authrouter.route("/me").get(protect, getUser);

export default authrouter;
