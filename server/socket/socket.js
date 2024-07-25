import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {}; 

io.on("connection", (socket) => {
  // console.log("connected: ", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId != "undefined") userSocketMap[userId] = socket.id;
  io.emit("getOnlineUsers", Object.keys(userSocketMap));


  socket.on("disconnect", () => {
    // console.log("disconnected:", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });


  socket.on("getRecommandation",async({user, chat})=>{
    const message = `Analyze given chat "${chat}" and tell what should user respond after this. Give a single answer and that too as js object`;
    try {
      const completion = await model.generateContent(message);
      const response = JSON.parse(completion.response.text().replace(/```json|```/g, '').trim());
      const suggestion = response.response;
      io.to(userSocketMap[user._id]).emit('sendRecommandation', suggestion);
    } catch (error) {
      console.log(error);
    }
  });
});

export { app, io, server, getReceiverSocketId };
