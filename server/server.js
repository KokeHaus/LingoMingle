const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const dbo = require("./db/conn");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));

// Perform a database connection when server starts
(async () => {
    try {
      await dbo.connectToServer();
      app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
      });
    } catch (err) {
      console.error('Failed to start the server:', err);
    }
  })();
  
