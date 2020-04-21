//#region Imports

import { ASCParams } from "./definitions";

//#endregion

/**
 * Método que retorna os parametros obtidos da linha de comando
 */
export async function getCLIParams(): Promise<ASCParams> {
    const [, , repositoryUrl] = process.argv;

    if (!repositoryUrl)
        throw new Error('É necessário informar o URL do repositório a ser clonado.');

    return {
        repositoryUrl,
    };
}