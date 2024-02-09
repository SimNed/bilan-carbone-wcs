import { DataSource } from "typeorm";
import Ride from "./entities/ride";
import Transportation from "./entities/transportation";

let dataSource: DataSource;

export const getDataSource = async () => {
  if (!dataSource) {
    dataSource = new DataSource({
      type: "postgres",
      url:
        process.env.NODE_ENV === "test"
          ? process.env.TEST_DATABASE_URL
          : process.env.DATABASE_URL,
      entities: [Ride, Transportation],
      synchronize: true,
    });
    await dataSource.initialize();
  }
  return dataSource;
};
