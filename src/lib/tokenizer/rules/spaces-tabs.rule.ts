//#region Imports

import { TokenizerRuleResult } from "../../definitions";
import { matchCount, readFileAsync } from '../../utils';
import { Logger } from '../../logger';


//#endregion

const logger = new Logger('SpacesTabsRule');

/**
 * A classe que representa uma regra que busca ver se ele usa mais espaços do que tabs para identar o código
 * 
 * @param filesPaths Os caminhos dos arquivos a serem tratados
 */
export async function SpacesTabsRule(filesPaths: string[]): Promise<TokenizerRuleResult> {
    let filesMatched = 0;
    let matchSpacesCount = 0;
    let matchTabsCount = 0;
    let processedFiles = 1;

    const spacesRegex = / /gs;
    const tabsRegex = /\t/gs;

    logger.log(`===================================`);
    logger.log(`========= SpacesTabsRule ==========`);
    logger.log(`===================================`);

    for(let file of filesPaths) {
        logger.log(`Começando a processar ${ processedFiles } de ${ filesPaths.length }...`);
        
        const source = await readFileAsync(file, 'utf-8');

        logger.log(`Processando arquivo: ${ file }`);

        logger.log('Procurando por espaços...');
        const matchSpaces = matchCount(spacesRegex, source);

        logger.log('Procurando por tabs...');
        const matchTabs = matchCount(tabsRegex, source);

        if (matchSpaces > 0 || matchTabs > 0)
            filesMatched++;

        if (matchSpaces > matchTabs)
            matchSpacesCount++
        else
            matchTabsCount++;

        processedFiles++;
        logger.log(`===================================`);
    }

    const preferSpaces = matchSpacesCount > matchTabsCount;
    
    const result = ~~((preferSpaces ? matchSpacesCount / filesMatched : matchTabsCount / filesMatched) * 100);
    const resultDescription = preferSpaces 
        ? `Há uma dominância maior pela escolha de usar ESPAÇOS, está sendo usado ESPAÇOS em ${ result }% dos arquivos.`
        : `Há uma dominância maior pela escolha de usar TABS, está sendo usado TABS em ${ result }% dos arquivos.`;

    return {
        name: 'Espaços ou Tabs',
        description: 'Uma regra usada para verificar se o usuário prefere usar espaços ou tabs para identar o código.',
        filesMatched,
        processedFiles: filesPaths.length,
        result,
        resultDescription,
    };
}
