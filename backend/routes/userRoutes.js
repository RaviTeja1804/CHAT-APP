import express from "express";
import userController from "../controllers/userController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", userController.getUsersForSidebar)

export default router;