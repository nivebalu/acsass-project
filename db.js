const mongoose = require("mongoose");

const connectToMongoDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/users");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw new Error("Error connecting to MongoDB");
  }
};

module.exports = connectToMongoDB;
