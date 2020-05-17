//#region Imports

import { Connection } from "typeorm";
import { Express, Response, Request } from "express";

import { UserEntity } from "../database/entities/user.entity";
import { clone } from "../../lib/clone";
import { getTypescriptFiles } from "../../lib/list";
import { getTokenizationResults } from "../../lib/tokenizer";
import { MetricEntity } from "../database/entities/metric.entity";

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
		repository.find({ relations: ['metrics'] }).then(entities => res.json(entities));
	});

	app.post('/users', async (req: Request, res: Response) => {
		const userEmail = req.body.email;
		const repositoryUrl = req.body.repositoryUrl;

		if (!userEmail)
			return res.status(400).json({ message: 'É necessário enviar o e-mail do usuário.' });

		if (!repositoryUrl)
			return res.status(400).json({ message: 'É necessário enviar o url do repositório que irá ser processado.' });

		let user = await repository.findOne({ where: { email: userEmail }, relations: ['metrics'] });

		if (!user)
			user = await repository.create({ email: userEmail });

		const alreadyProcessedThisRepositoryForUser = user.metrics?.some(metric => metric.repositoryUrl === repositoryUrl);

		if (alreadyProcessedThisRepositoryForUser)
			return res.status(400).json({ message: 'Já foi processado esse repositório para esse usuário em especifico.' });

		const { success, error } = await clone(repositoryUrl)
			.then(repositoryPath => getTypescriptFiles(repositoryPath))
			.then(async files => await getTokenizationResults(files))
			.then(success => ({ success, error: undefined }))
			.catch(error => ({ error, success: undefined }));

		if (error || !success)
			return res.status(400).json(error);
		
		const newMetrics = success.map(result => new MetricEntity({
			name: result.name,
			description: result.description,
			result: result.result,
			resultDescription: result.resultDescription,
			filesMatched: result.filesMatched,
			processedFiles: result.processedFiles,
			repositoryUrl,
		}));

		user.metrics = [...(user.metrics || []), ...newMetrics];

		await repository.save(user);

		return res.status(200).json(user);
	});
}