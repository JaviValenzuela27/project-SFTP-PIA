import { Injectable } from '@nestjs/common';
import { Client } from 'ssh2';
import * as path from 'path';
// import { LoggerService } from 'src/logger';

@Injectable()
//Clase que gestionar el servidor sftp
export class SftpService {
  //Metodo para subir un archivo al servidor sftp
  async uploadFileToSFTP(
    //Datos para conectar al server sftp
    host: string,
    port: number,
    username: string,
    password: string,
    localFilePath: string,
    remotePath: string,
  ): Promise<void> {
    // const logger = new LoggerService();
    const conn = new Client();
    return new Promise((resolve, reject) => {
      conn.on('ready', () => {
        conn.sftp((err, sftp) => {
          if (err) {
            conn.end();
            // logger.error('Error en el servidor SFTP: ', err);
            reject(err);
          }
          //Unir ruta en el server con la ruta del archivo cargado para crear una ruta unica
          sftp.fastPut(
            localFilePath,
            path.join(remotePath, path.basename(localFilePath)),
            (err) => {
              conn.end();
              if (err) {
                // logger.error(
                //   'Error al cargar el archivo al servidor SFTP: ',
                //   err,
                // );
                reject(err);
              } else {
                resolve();
              }
            },
          );
        });
      });

      conn.on('error', (err) => {
        // logger.error('Error en la conexion con el servidor SFTP: ', err);
        reject(err);
      });

      conn.connect({
        host,
        port,
        username,
        password,
      });
    });
  }
  //Extrar el nombre del archivo con la "/incluida"
  getFileName(ruta) {
    const lastSlashIndex = ruta.lastIndexOf('/');
    if (lastSlashIndex !== -1) {
      return ruta.slice(lastSlashIndex);
    }
    return ruta;
  }
}
