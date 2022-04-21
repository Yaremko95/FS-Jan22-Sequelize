import { Sequelize } from "sequelize";

const { PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE } = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  port: PGPORT,
  dialect: "postgres",
});

export const testDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("db connection successful");
  } catch (error) {
    console.log("db connection failed");
  }
};

export const syncDB = async () => {
  try {
    await sequelize.sync();
  } catch (error) {
    console.log("failed to sync db");
  }
};

export default sequelize;
