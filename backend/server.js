import express from "express";
import db from "./config/db.js";
import cors from 'cors'
import multer from "multer";
import { router as pubRoutes } from './routes/pubRoutes.js'
import { postReview } from "./controllers/pubController.js";

// Create an instance of Express
const app = express();

app.use(cors({ methods: ["GET", "POST"] }));
app.use(express.json())

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Define a port (use process.env.PORT for production)
const port = process.env.PORT || 3001;

app.use('/api', pubRoutes)
app.post("/api/review", upload.none(), postReview);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


