import { DataSourceOptions, DataSource } from "typeorm";
import dbConfig = require("./ormconfig");

export const AppDataSource = new DataSource(dbConfig as DataSourceOptions);  