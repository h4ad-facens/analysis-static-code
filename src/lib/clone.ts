//#region Imports

const git = require("nodegit");

import fs from 'fs';
import utils from 'util';
import rimraf from 'rimraf';

import { getHashFromString } from './utils';
import { Logger } from './logger';

//#endregion

const logger = new Logger('Clone');

/**
 * 
 * @param url O url do repositório a ser clonado
 */
export async function clone(url: string): Promise<string> {
    logger.log(`Clonando o projeto de: ${ url }`);

    const hashUrl = getHashFromString(url);
    logger.log(`Gerando um hash do URL: ${ hashUrl }`);

    const path = `/tmp/analysis-static-code/${ hashUrl }`;
    logger.log(`O repositório será armazenado em: ${ path }`);

    const exists = utils.promisify(fs.exists);

    if (await exists(path)) {
        logger.warn('A pasta já existe, deletando...');

        await utils.promisify(rimraf)(path);
        logger.log('Pasta deletada com sucesso!');
    }

    logger.log('Executando o git clone...');
    await git.Clone(url, path);

    logger.log('Repositório clonado com sucesso!');

    return path;
}
