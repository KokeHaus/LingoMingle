import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { connectMongoDB } from "./dbs/mongodb.js";
import "dotenv/config.js";

const app = new Koa();
const router = new Router();
const httpServer = createServer(app.callback());
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: "*", // Adjust as needed
    methods: ["GET", "POST"],
  },
});

// Middleware
import { AuthMiddleware } from "./middleware/auth.js";

app.use(cors());
app.use(bodyParser());
app.use(AuthMiddleware);

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

// Routes
import authRoutes from "./routes/auth.js";
import matchRoutes from "./routes/match.js";

router.use("/api", authRoutes.routes());
router.use("/api", matchRoutes.routes());
app.use(router.routes()).use(router.allowedMethods());

// Connect to MongoDb
await connectMongoDB();

// serve!
httpServer.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port: ${process.env.PORT || 5000}`);
});
