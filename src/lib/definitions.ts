/**
 * A interface que representa as informações relevantes extraidas ao executar esse serviço
 */
export interface ASCParams {

    /**
     * O url do repositório no qual está armazenado o código a ser analisado
     */
    repositoryUrl: string;

}

/**
 * O tipo que representa regra de tokenização
 */
export type TokenizerRule = (filesPaths: string[]) => TokenizerRuleResult;

/**
 * A interface que representa o resultado da tokenização do código
 */
export interface TokenizerRuleResult {

    /**
     * O nome dessa regra
     */
    name: string;

    /**
     * A descrição dessa regra
     */
    description: string;

    /**
     * O resultado que essa regra teve após processar os arquivos
     */
    result: number;

    /**
     * Uma descrição para o resultado fornecido
     */
    resultDescription: string;

    /**
     * O número de arquivos que bateram com essa regra
     */
    filesMatched: number;

    /**
     * O número de arquivos processados
     */
    processedFiles: number;
}