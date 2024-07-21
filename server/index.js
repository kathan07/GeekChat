import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from './db/db.js';
import authRoute from './routes/auth.route.js';
import messageRoute from './routes/message.route.js';
import userRoute from './routes/user.route.js';
import { app, server } from './socket/socket.js';
import express from 'express';
import cors from 'cors';

app.use(express.json());
app.use(cors());
dotenv.config();

const port = process.env.PORT;

app.use(cookieParser());  

connectDB();
app.use("/server/auth", authRoute);
app.use("/server/messages", messageRoute);
app.use("/server/user", userRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})