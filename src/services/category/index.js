import express from "express";
import models from "../../db/models/index.js";
const { Category, BlogCategory } = models;
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.send(categories);
  } catch (error) {
    next(error);
  }
});

router.post("/:categoryId/blogs/:blogId", async (req, res, next) => {
  try {
    const newBlogCategory = await BlogCategory.create({
      blogId: req.params.blogId,
      categoryId: req.params.categoryId,
    });
    res.send(newBlogCategory);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newCategories = await Category.bulkCreate([
      { name: "node.js" },
      { name: "react" },
      { name: "frontend" },
      { name: "backend" },
    ]);
    res.send(newCategories);
  } catch (error) {
    next(error);
  }
});

export default router;
