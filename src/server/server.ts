//#region Imports

import express from "express";
import bodyparser from 'body-parser';

import { Logger } from "../lib/logger";
import { getDatabaseConnection } from "./database";
import { setupUserRoutes } from "./controllers/user.controller";
import { setupMetricRoutes } from "./controllers/metric.controller";

//#endregion

//#region Declarations

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyparser.json());

const logger = new Logger('Express');

//#endregion

//#region Routes

const server = app.listen(port, () => {
	logger.log('Listening on port: ' + port);
});

(async () => {
	const connection = await getDatabaseConnection();

	setupUserRoutes(app, connection);
	setupMetricRoutes(app, connection);
})().catch((error) => {
	logger.error(error);

	server.close();
});

//#endregion