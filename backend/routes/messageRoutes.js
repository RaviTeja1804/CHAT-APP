import express from "express";
import messageController from "../controllers/messageController.js"
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/send/:senderId/:receiverId",messageController.sendMessage);
router.get("/get/:senderId/:receiverId",messageController.getMessages);

export default router;