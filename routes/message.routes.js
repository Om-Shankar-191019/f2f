import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/send/:id", protectRoute, sendMessage); // id === receiverId
router.get("/:id", protectRoute, getMessages); // id === receiverId or other userId to chat with

export default router;
