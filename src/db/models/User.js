import sequelize from "../index.js";
import { DataTypes } from "sequelize";

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
  }
  //   {
  //     timestamps: false,
  //   }
);

export default User;
