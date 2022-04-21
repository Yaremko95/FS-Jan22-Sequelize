import cors from "cors";
import express from "express";
import { testDB, syncDB } from "./db/index.js";
import usersRouter from "./services/users/index.js";
import blogsRouter from "./services/blogs/index.js";
import reviewsRouter from "./services/reviews/index.js";
import categoryRouter from "./services/category/index.js";

const server = express();
server.use(express.json());
server.use(cors());

const { PORT = 5001 } = process.env;

server.use("/users", usersRouter);
server.use("/blogs", blogsRouter);
server.use("/reviews", reviewsRouter);
server.use("/categories", categoryRouter);

const initalize = async () => {
  try {
    server.listen(PORT, async () => {
      console.log("✅ Server is listening on port " + PORT);
      await testDB();
      await syncDB();
    });

    server.on("error", (error) => {
      console.log("❌ Server is not running due to error : " + error);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

initalize();
