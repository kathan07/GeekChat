import express from "express";
import verifyUser from "../utils/verifyUser.js";
import { getUsersForSidebar } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", verifyUser, getUsersForSidebar);

export default router;