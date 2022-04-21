import sequelize from "../index.js";
import { DataTypes } from "sequelize";

const BlogCategory = sequelize.define(
  "blogCategory",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
  },
  { timestamps: false }
);

export default BlogCategory;
