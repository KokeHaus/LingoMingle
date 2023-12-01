const express = require("express");
const http = require('http');
const cors = require("cors");
const socketIo = require("socket.io");
require("dotenv").config({ path: "./config.env" });
const dbo = require("./db/conn");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Adjust this according to your front-end URL for security
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Your API routes
const authRoutes = require('./routes/auth');
const matchRoutes = require('./routes/match');
const recordRoutes = require('./routes/record');
app.use('/api', authRoutes);
app.use('/api', matchRoutes);
app.use('/api', recordRoutes);

// WebSocket logic
io.on('connection', (socket) => {
  console.log('A user connected with socket ID:', socket.id);

  // Example: On receiving 'joinQueue' event from client
  socket.on('joinQueue', (data) => {
    console.log(`${data.username} joined the queue`);
    // Handle queue joining logic
    // ...
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User with socket ID ${socket.id} disconnected`);
    // Handle disconnection logic
    // ...
  });
});

// Database and server setup
dbo.connectToServer((err) => {
    if (err) {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1);
    }

    server.listen(process.env.PORT || 5000, () => {
        console.log(`Server is running on port: ${process.env.PORT || 5000}`);
    });
});
