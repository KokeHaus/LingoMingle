const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const dbo = require("./db/conn");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth'); 
app.use('/api', authRoutes); 

app.use(require("./routes/record"));

// Use the callback approach
dbo.connectToServer((err) => {
    if (err) {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1); // Exit the process if unable to connect
    }

    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
});
