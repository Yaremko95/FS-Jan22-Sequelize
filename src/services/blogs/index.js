import express from "express";
import models from "../../db/models/index.js";
import sequelize from "sequelize";

const { Blog, User, Review, Category, BlogCategory } = models;

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    let query = {};

    if (req.query.search) {
      query = {
        [sequelize.Op.or]: [
          {
            title: {
              [sequelize.Op.iLike]: `%${req.query.search}%`,
            },
          },
          {
            content: {
              [sequelize.Op.iLike]: `%${req.query.search}%`,
            },
          },
        ],
      };
    }

    const blogs = await Blog.findAll({
      include: [
        User,
        { model: Category, through: { attributes: [] } },
        { model: Review, include: [User] },
      ],
      where: query,
      order: [[sequelize.fn("lower", sequelize.col("title")), "asc"]],
    });
    res.send(blogs);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id, {
      include: [
        User,
        { model: Category, through: { attributes: [] } },
        { model: Review, include: { model: User } },
      ],
    });
    res.send(blog);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newBlog = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      userId: req.body.userId,
    });

    if (req.body.categories && newBlog) {
      req.body.categories.forEach(async (catgoryId) => {
        await BlogCategory.create({
          categoryId: catgoryId,
          blogId: newBlog.id,
        });
      });
    }

    res.send(newBlog);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put("/:id", (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const rows = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send({ rows });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;
