//#region Imports

import { TokenizerRuleResult } from "../../definitions";
import { matchCount, readFileAsync } from '../../utils';
import { Logger } from '../../logger';


//#endregion

const logger = new Logger('MethodCaseRule');

/**
 * A classe que representa uma regra que verifica se o usuário prefere PascalCase ou CamelCase
 * 
 * @param filesPaths Os caminhos dos arquivos a serem tratados
 */
export async function MethodCaseRule(filesPaths: string[]): Promise<TokenizerRuleResult> {
    let filesMatched = 0;
    let matchPascalCaseCount = 0;
    let matchCamelCaseCount = 0;
    let processedFiles = 1;

    logger.log(`===================================`);
    logger.log(`========= MethodCaseRule ==========`);
    logger.log(`===================================`);

    const methodPascalCase = /[^new] ([A-Z][a-z0-9]+)((\d)|([A-Z0-9][a-z0-9]+))*([A-Z])?[A-Za-z0-9]*\(/gs;
    const methodCamelCase = /[^new] ([a-z][a-z0-9]+)((\d)|([A-Z0-9][a-z0-9]+))*([A-Z])?[A-Za-z0-9]*\(/gs;

    for(let file of filesPaths) {
        logger.log(`Começando a processar ${ processedFiles } de ${ filesPaths.length }...`);
        
        const source = await readFileAsync(file, 'utf-8');

        logger.log(`Processando arquivo: ${ file }`);

        logger.log('Procurando por métodos com o nome em PascalCase...');
        const matchPascalCase = matchCount(methodPascalCase, source, true);

        logger.log('Processando por métodos com o nome em CamelCase...');
        const matchCamelCase = matchCount(methodCamelCase, source);

        if (matchPascalCase > 0 || matchCamelCase > 0)
            filesMatched++;

        matchPascalCaseCount += matchPascalCase;
        matchCamelCaseCount += matchCamelCase;

        processedFiles++;
        logger.log(`===================================`);
    }

    const totalMethods = matchCamelCaseCount + matchPascalCaseCount;
    const percentCamelCase = ~~(matchCamelCaseCount / totalMethods * 100);
    const percentPascalCase = ~~(matchPascalCaseCount / totalMethods * 100);

    const result = percentCamelCase;
    const resultDescription = `Foram encontrados ${ totalMethods } métodos dos quais ${ matchCamelCaseCount } estão nomeados utilizando camelCase, totalizando ${ percentCamelCase }% de métodos em camelCase e ${ percentPascalCase }% de métodos em PascalCase.`;

    return {
        name: 'Métodos Pascal-Camel Case',
        description: 'Uma regra usada para verificar os métodos comentados estão utilizando camelCase ou PascalCase.',
        filesMatched,
        processedFiles: filesPaths.length,
        result,
        resultDescription,
    };
}
