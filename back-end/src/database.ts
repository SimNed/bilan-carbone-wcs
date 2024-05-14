import { DataSource } from "typeorm";
import Ride from "./entities/ride";
import Transportation from "./entities/transportation";
import User from "./entities/user";
import UserSession from "./entities/userSession";

let dataSource: DataSource;

export const getDataSource = async () => {
  if (!dataSource) {
    dataSource = new DataSource({
      type: "postgres",
      url:
        process.env.NODE_ENV === "test"
          ? process.env.TEST_DATABASE_URL
          : process.env.DATABASE_URL,
      entities: [Ride, Transportation, User, UserSession],
      synchronize: true,
    });
    await dataSource.initialize();
  }
  return dataSource;
};
