import express from "express";
import models from "../../db/models/index.js";
const { User, Blog } = models;
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({ include: Blog });
    res.send(users);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    // const user = await User.findOne({
    //   where: {
    //     id: req.params.id,
    //   },
    // });
    res.send(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.send(newUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const updatedUser = await User.update(req.body, {
      returning: true,
      where: {
        id: req.params.id,
      },
    });
    res.send(updatedUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const rows = await User.destroy({
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
