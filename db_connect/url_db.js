const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    console.log("MONGO_URI =", process.env.MONGO_URI); // Debugging
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error connection to MongoDB : ${error.message}`);
    process.exit(1);
  }
};

module.exports = { dbConnect };
