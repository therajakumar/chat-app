import { Router } from "express";
import {
  accessChat,
  addGroup,
  createGroupChat,
  fetchChat,
  removeFromGroup,
  renameGroup,
} from "../controllers/chatcontroller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChat);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/add").put(protect, addGroup);
router.route("/remove").put(protect, removeFromGroup);

export default router;
