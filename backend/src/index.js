import express from 'express';
import { connectDB } from './lib/db.js';
import dotenv from 'dotenv';
import authRoute from './routes/auth.route.js';
import profileRoutes from './routes/auth.route.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config(); 
const app = express();
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use("/api/auth", authRoute);
app.use("/api/profile", profileRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
  connectDB();
});