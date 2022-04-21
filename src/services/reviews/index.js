import express from "express";
import models from "../../db/models/index.js";
const { Review, Blog, User } = models;
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      include: [Blog, User],
    });
    res.send(reviews);
  } catch (error) {
    next(error);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newReview = await Review.create({
      text: req.body.text,
      rating: req.body.rating,
      blogId: req.body.blogId,
      userId: req.body.userId,
    });
    res.send(newReview);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

export default router;
