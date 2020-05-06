//#region Imports

import './logger';

import { clone } from './clone';
import { getCLIParams } from './params';
import { Logger } from './logger';

//#endregion

const logger = new Logger('Global');

/**
 * Método que irá lidar com a execução do programa de analise
 */
export default async function init(): Promise<void> {
    await getCLIParams()
    .then(params => clone(params.repositoryUrl))
    .catch(logger.error);
}

init();