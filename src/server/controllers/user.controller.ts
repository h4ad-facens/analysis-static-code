//#region Imports

import { Connection } from "typeorm";
import { Express, Response } from "express";

import { UserEntity } from "../database/entities/user.entity";

//#endregion

/**
 * Método que inicializa as rotas do usuários
 * 
 * @param app A referencia para a aplicação Express
 * @param connection A referencia para a conexão com o banco de dados
 */
export function setupUserRoutes(app: Express, connection: Connection): void {
	const repository = connection.getRepository(UserEntity);

	app.get('/users', async (_, res: Response) =>  {
		repository.find().then(entities => res.json(entities));
	});
}