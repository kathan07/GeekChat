import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from './db/db.js';
import authRoute from './routes/auth.route.js';


const app = express()
app.use(express.json());
dotenv.config();

const port = process.env.PORT;

app.use(cookieParser());  

connectDB();
app.use("/server/auth", authRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})