import mongoose, { trusted } from "mongoose";

export const PubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  address: String,
  rating: {
    type: Number,
    default: 0,
  },
  location: {
    lat: Number,
    lng: Number,
  },
  cuisines: {
    type: [String],
  },
  featured: {
    type: [String],
  },
  images: {
    type: [Buffer],
  },
});

export const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required:true
  },
  name: {
    type: String,
    required:true
  },
  image: {
    type: Buffer,
    required:true 
  }

},
  {timestamps:true}
)

const reviewSchema = new mongoose.Schema({
  pubId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pub",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String, 
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String, // Store image references (e.g., URLs or file paths)
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Pub = mongoose.model("Pub", PubSchema);
export const User = mongoose.model("User", userSchema);
export const Review = mongoose.model("Review", reviewSchema);
