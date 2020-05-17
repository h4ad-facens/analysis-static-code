import { Logger } from "./logger";

import { readFile } from 'fs';
import { promisify } from 'util';

/**
 * Método que gera um hash a partir de uma string
 * 
 * @param value O valor a ser usado para gerar o hash
 */
export function getHashFromString(value: string): string {
    let hash = 0, i, chr;

    for (i = 0; i < value.length; i++) {
        chr = value.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0;
    }

    return hash.toString();
}

/**
 * Método que conta a quantidade de matches ocorridos em um código
 * 
 * @param regexPattern O Pattern Regex
 * @param sourceString O texto a ser verificado
 * @param debug Diz se está no modo debug
 */
export function matchCount(regexPattern: RegExp, sourceString: string, debug?: boolean): number {
    let output = []
    let match;

    const logger = new Logger('MatchCount');

    let regexPatternWithGlobal = RegExp(regexPattern, "gs");

    while (match = regexPatternWithGlobal.exec(sourceString)) {
        // get rid of the string copy
        delete match.input

        if (debug)
            logger.log(match);

        // store the match data
        output.push(match);
    } 

    if (output.length) {
        logger.log(`RegEx encontrados: ${ output.length }`);
    }

    return output.length;
}

/**
 * Método que lê o conteúdo de um arquivo de forma assincrona
 */
export const readFileAsync = promisify(readFile);