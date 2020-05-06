//#region Imports

import { Connection } from "typeorm";
import { Express, Response } from "express";

import { MetricEntity } from "../database/entities/metric.entity";

//#endregion

/**
 * Método que inicializa as rotas das métricas
 * 
 * @param app A referencia para a aplicação Express
 * @param connection A referencia para a conexão com o banco de dados
 */
export function setupMetricRoutes(app: Express, connection: Connection): void {
	const repository = connection.getRepository(MetricEntity);

	app.get('/metrics', async (_, res: Response) =>  {
		repository.find().then(entities => res.json(entities));
	});
}