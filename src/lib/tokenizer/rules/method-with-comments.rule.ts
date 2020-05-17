//#region Imports

import { TokenizerRuleResult } from "../../definitions";
import { matchCount, readFileAsync } from '../../utils';
import { Logger } from '../../logger';


//#endregion

const logger = new Logger('MethodWithCommentsRule');

/**
 * A classe que representa uma regra que busca ver se os métodos possuem comentários
 * 
 * @param filesPaths Os caminhos dos arquivos a serem tratados
 */
export async function MethodWithCommentsRule(filesPaths: string[]): Promise<TokenizerRuleResult> {
    let filesMatched = 0;
    let matchMethodsWithComments = 0;
    let matchMethods = 0;
    let processedFiles = 1;

    logger.log(`===================================`);
    logger.log(`===== MethodWithCommentsRule ======`);
    logger.log(`===================================`);

    const methodWithCommentRegex = /\/\*\*((?:(?!\*).)*)\*(?:(?!\*\*).)*(?=((public async [a-zA-z]+\()|(private async [a-zA-z]+\()|(protected async [a-zA-z]+\()|(async [a-zA-z]+\()|(export async function [a-zA-z]+\()|(export default async function [a-zA-z]+\()|(export default function [a-zA-z]+\()|(async function [a-zA-z]+\()|(export function [a-zA-z]+\()|(public [a-zA-z]+\()|(private [a-zA-z]+\()|(protected [a-zA-z]+\()|([a-zA-Z]+\(\) ?\{)|(function [a-zA-z]+\()))/gs;
    const methodRegex = /((public async [a-zA-z]+\()|(private async [a-zA-z]+\()|(protected async [a-zA-z]+\()|(async [a-zA-z]+\()|(export async function [a-zA-z]+\()|(export default async function [a-zA-z]+\()|(export default function [a-zA-z]+\()|(async function [a-zA-z]+\()|(export function [a-zA-z]+\()|(public [a-zA-z]+\()|(private [a-zA-z]+\()|(protected [a-zA-z]+\()|([a-zA-Z]+\(\) ?\{)|(function [a-zA-z]+\())/gs;

    for(let file of filesPaths) {
        logger.log(`Começando a processar ${ processedFiles } de ${ filesPaths.length }...`);
        
        const source = await readFileAsync(file, 'utf-8');

        logger.log(`Processando arquivo: ${ file }`);
        logger.log('Processando métodos comentados...');
        const matchMethodWithComments = matchCount(methodWithCommentRegex, source);
        logger.log('Processando métodos com ou sem comentários...');
        const matchMethodCount = matchCount(methodRegex, source);

        if (matchMethodWithComments > 0 || matchMethodCount > 0)
            filesMatched++;

        matchMethodsWithComments += matchMethodWithComments
        matchMethods += matchMethodCount;

        processedFiles++;
        logger.log(`===================================`);
    }

    const result = ~~((filesMatched > 0 ? matchMethodsWithComments / matchMethods : 0) * 100);
    const resultDescription = `Foram encontrados ${ matchMethods } métodos dos quais ${ matchMethodsWithComments } estão comentados, totalizando ${ result }% de métodos comentados.`;

    return {
        name: 'Métodos Comentados',
        description: 'Uma regra usada para verificar se os todos os métodos, criados pelo usuário, possuem comentário.',
        filesMatched,
        processedFiles: filesPaths.length,
        result,
        resultDescription,
    };
}
