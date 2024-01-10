import  {  Sequelize} from "sequelize";

import config from "../utils/envConfig";

const db = new Sequelize(
	config.database.name,
	config.database.username,
	config.database.password,
	{
		host: config.database.host,
		port: config.database.port,
		dialect: "postgres",
		define: {
			timestamps: true,
		},
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
	},
);

export default db;
