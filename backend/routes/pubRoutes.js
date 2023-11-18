import express from 'express';
import {
  getAllPubsInfo,
  postUser,
  fetchPubReviews,
} from "../controllers/pubController.js";

export const router = express.Router()

router.get('/pubsInfo', getAllPubsInfo)
router.post('/postUser',postUser)
router.get("/pubReviews", fetchPubReviews);