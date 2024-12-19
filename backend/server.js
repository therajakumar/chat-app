import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connection from "./db/db.js";
import { createServer } from "http";
import { Server } from "socket.io";
import authrouter from "./routers/userRoutes.js";
import chatRoutes from "./routers/chatRouts.js";
import messageRoute from "./routers/messageRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

connection();

app.get("/", (_, res) => {
  res.send("Server is ready");
});

app.use("/api/user", authrouter);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoute);

app.use("*", (_, res) => {
  res.status(404).json({ message: "Page not found" });
});

io.on("connection", (socket) => {
  socket.on("setup", (chatId) => {
    socket.join(chatId);
  });

  socket.on("message", (newMessage) => {
    const { chatId, message } = newMessage;

    io.to(chatId).emit("message", message);
  });
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT);
