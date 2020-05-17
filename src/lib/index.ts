//#region Imports

import { clone } from './clone';
import { getCLIParams } from './params';
import { Logger } from './logger';
import { getTypescriptFiles } from './list';
import { getTokenizationResults } from './tokenizer';

//#endregion

const logger = new Logger('Global');

/**
 * Método que irá lidar com a execução do programa de analise
 */
export default async function init(): Promise<void> {
    await getCLIParams()
    .then(params => clone(params.repositoryUrl))
    .then(repositoryPath => getTypescriptFiles(repositoryPath))
    .then(async files => await getTokenizationResults(files))
    .then(results => logger.log(results))
    .catch(error => logger.error(error));
}

init();