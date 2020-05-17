//#region Imports

import { MethodWithCommentsRule } from "./rules/method-with-comments.rule";
import { TokenizerRuleResult } from "../definitions";
import { Logger } from "../logger";
import { SpacesTabsRule } from "./rules/spaces-tabs.rule";
import { MethodCaseRule } from "./rules/method-case.rule";


//#endregion

const rules = [
    MethodWithCommentsRule,
    SpacesTabsRule,
    MethodCaseRule,
];

const logger = new Logger('Tokenizer');

/**
 * Método que retorna os resultados das regras processadas
 * 
 * @param filePaths O caminho dos arquivos que vão ser processados
 */
export async function getTokenizationResults(filePaths: string[]): Promise<TokenizerRuleResult[]> {
    const results: TokenizerRuleResult[] = [];

    logger.log('Processando regras...');

    for (let i = 0; i < rules.length; i++) {
        logger.log(`Regra ${ i + 1 } de ${ rules.length }: `);

        results.push(await rules[i](filePaths));

        logger.log('Regra processada...');
    }

    return results;
}