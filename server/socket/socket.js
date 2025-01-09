import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { Groq } from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

const groq = new Groq({ apiKey: process.env.API_KEY });

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

  socket.on("getRecommandation", async ({ user, chat }) => {
    const message = `Analyze given chat "${chat}" and tell what should user respond after this. Give a single answer and that too as javascript object in given format like {
    "text": "Sample text"
    }`;
    try {
      const completion = await groq.chat.completions.create({
        messages: [{ role: "user", content: message }],
        model: "mixtral-8x7b-32768",
      });
      const content = completion.choices[0].message.content.trim();
      let suggestion;

      try {
        // First, try to parse the entire content as JSON
        const response = JSON.parse(content);
        suggestion = response.text;
      } catch (parseError) {
        // If parsing fails, try to extract JSON from the content
        const match = content.match(/\{[\s\S]*\}/);
        if (match) {
          const jsonStr = match[0];
          const response = JSON.parse(jsonStr);
          suggestion = response.text;
        } else {
          // If no JSON-like structure is found, use the content as is
          suggestion = content;
        }
      }

      if (!suggestion) {
        throw new Error("Failed to extract suggestion from response");
      }

      io.to(userSocketMap[user._id]).emit("sendRecommandation", suggestion);
    } catch (error) {
      console.log(error);
    }
  });
});

export { app, io, server, getReceiverSocketId };
