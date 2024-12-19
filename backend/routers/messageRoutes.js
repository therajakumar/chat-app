import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  allMessage,
  sendMessage,
  allUserChat,
} from "../controllers/messagecontroller.js";

const router = express.Router();

router.route("/").post(protect, sendMessage);
router.route("/users").get(protect, allUserChat);
router.route("/:chatId").get(protect, allMessage);

export default router;
