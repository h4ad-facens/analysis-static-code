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
