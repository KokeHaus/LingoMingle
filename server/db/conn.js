const mongoose = require("mongoose");

module.exports = {
  connectToServer: function (callback) {
    mongoose
      .connect(process.env.ATLAS_URI)
      .then(() => {
        console.log("Successfully connected to MongoDB.");
        callback();
      })
      .catch((err) => {
        console.error("Error connecting to MongoDB", err);
        callback(err);
      });
  },
};
