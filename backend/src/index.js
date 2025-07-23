import express from "express";
import { connectDB } from "./lib/db.js";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import profileRoutes from "./routes/profile.routes.js";
import collabRequestRoutes from "./routes/request.routes.js";
import messageRoutes from "./routes/message.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";
import path from "path";

dotenv.config();
const __dirname = path.resolve();

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoute);
app.use("/api/profile", profileRoutes);
app.use("/api/request", collabRequestRoutes);
app.use("/api/message", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get((req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(3000, () => {
  console.log("Server is running on port 3000");
  connectDB();
});
