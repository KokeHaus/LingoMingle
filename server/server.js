import express, { json } from "express";
import { createServer } from "http";
import cors from "cors";
import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import { connectMongoDB } from "./dbs/mongodb.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust this according to your front-end URL for security
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(json());

// Your API routes
import authRoutes from "./routes/auth.js";
import matchRoutes from "./routes/match.js";
app.use("/api", authRoutes);
app.use("/api", matchRoutes);

// WebSocket logic
io.on("connection", (socket) => {
  console.log("A user connected with socket ID:", socket.id);

  // Example: On receiving 'joinQueue' event from client
  socket.on("joinQueue", (data) => {
    console.log(`${data.username} joined the queue`);
    // Handle queue joining logic
    // ...
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`User with socket ID ${socket.id} disconnected`);
    // Handle disconnection logic
    // ...
  });
});

// Connect to MongoDb
await connectMongoDB();

// serve!
server.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port: ${process.env.PORT || 5000}`);
});
