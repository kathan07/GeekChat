import express from 'express';
import {sendMessages,getMessages} from '../controllers/message.controller.js';
import verifyUser from '../utils/verifyUser.js';

const router = express.Router();

router.get("/:id",verifyUser, getMessages);
router.post("/send/:id", verifyUser,sendMessages);

export default router;


