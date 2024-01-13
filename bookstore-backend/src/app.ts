import express from "express";

import csrf from "csurf";
import cookieParser from "cookie-parser";

import config from "./utils/envConfig";

import { clientRoute, employeeRoute } from "./routers";
import db from "./config/db";

const app = express();

app.use(cookieParser());
app.use(csrf({ cookie: true }));

app.use("/api", employeeRoute);
app.use("/api", clientRoute)

db.authenticate()
	.then((res) => {
		db.sync();
		console.log("Database is online");
	})
	.catch((err) => console.log(err));

app.listen(config.port, () => {
	console.log(`Server listen on port ${config.port}...`);
});

