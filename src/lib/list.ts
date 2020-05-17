//#region Imports

import fs from 'fs';
import path from 'path';

import { Logger } from './logger';

//#endregion

const logger = new Logger('List');

/**
 * Método que busca todos os arquivos Typescript de um diretório
 * 
 * @param path O caminho que será usado para buscar os arquivos
 */
export function getTypescriptFiles(path: string): string[] {
    logger.log(`Começa a busca por arquivos TypeScript no diretório: ${ path }`);

    const files = getFilesRecursive(path, '.ts');

    logger.log(`Foram encontrados ${ files.length } arquivos.`);

    return files;
}

/**
 * Método que busca em um diretório arquivos com uma certa extensão
 * 
 * @param dir O diretório raiz que será usado para começar a busca
 * @param extension A extensão do arquivo procurado
 */
export function getFilesRecursive(dir: string, extension: string): string[] {
    // This is where we store pattern matches of all files inside the directory
    let results: string[] = [];
  
    // Read contents of directory
    fs.readdirSync(dir).forEach(function (dirInner) {
      // Obtain absolute path
      dirInner = path.resolve(dir, dirInner);
  
      // Get stats to determine if path is a directory or a file
      var stat = fs.statSync(dirInner);
  
      // If path is a directory, scan it and combine results
      if (stat.isDirectory()) {
        results = results.concat(getFilesRecursive(dirInner, extension));
      }
  
      // If path is a file and ends with pattern then push it onto results
      if (stat.isFile() && dirInner.endsWith(extension)) {
        results.push(dirInner);
      }
    });
  
    return results;
  };