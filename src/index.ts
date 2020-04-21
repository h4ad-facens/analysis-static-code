//#region Imports

import './lib/logger';

import { clone } from './lib/clone';
import { getCLIParams } from './lib/params';
import { Logger } from './lib/logger';

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