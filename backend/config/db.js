import mongoose from "mongoose";
import "dotenv/config";


// Define your MongoDB connection URI
const MONGO_URI = process.env.MongoDB_URL;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connected', () => { 
    console.log('connected to mongodb')
})


db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

export default db;