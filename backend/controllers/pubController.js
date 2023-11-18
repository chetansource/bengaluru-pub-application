import { Pub, User, Review } from "../models/pub.js";

export const getAllPubsInfo = async (req, res) => {
  try {
    const pubData = await Pub.find();
    if (!pubData) {
      return res.status(404).json({ message: "No pubs details found" });
    } 

    res.status(200).json(pubData);

  } catch (error) {
    console.log("Error:", error);
    res.sendStatus(500);
  }
};


export const postUser = async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email })
    if (!userExists) {
      console.log()
      const user = await User.create(req.body);
      return res.status(200).json(user)
    }

      res.status(200).json(userExists);

  } catch (error) {
    console.log("Error", error);
    res.sendStatus(500);
  }
};

export const postReview = async (req, res) => { 
  try {
    const { rating, text, images, pubId, email } = req.body; 
    const userExists = await User.findOne({ email: email })
    if (userExists) { 
      res.json({ message: "Only one review is allowed" });
    }
    const userId = userExists._id;
    const userName = userExists.name;

    const userReview = await Review.findOne({ userId: userId })

    if (!userReview) { 
      const data = await Review.create({
        userId: userId,
        pubId: pubId,
        name:userName,
        rating: rating,
        text: text,
        images:images,
      });
       res.status(200).json(data); 
    }
    
  } catch (error) {
    console.log("Error", error) 
    res.sendStatus(500)
  }
}

export const fetchPubReviews = async (req,res) => {
  try {
    const review = await Review.find(req.query);
    if (!review) { 
      res.status(200).json("No Reviews");
    }
    res.status(200).json(review)
  } catch (error) {
    console.log("Error", error) 
    res.sendStatus(500)
  }
}