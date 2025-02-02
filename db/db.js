const mongoose = require("mongoose");
const env = require("dotenv");

env.config();

const uri = process.env.MONGO_DB_URI;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database");
  } catch (err) {
    console.error("Database connection failed:", err);
  }
};

module.exports = connectToDatabase;
