import { Injectable } from '@nestjs/common';
import { Client } from 'ssh2';
import * as path from 'path';

@Injectable()
export class SftpService {
  async uploadFileToSFTP(
    host: string,
    port: number,
    username: string,
    password: string,
    localFilePath: string,
    remotePath: string,
  ): Promise<void> {
    const conn = new Client();

    return new Promise((resolve, reject) => {
      conn.on('ready', () => {
        conn.sftp((err, sftp) => {
          if (err) {
            conn.end();
            reject(err);
          }

          sftp.fastPut(
            localFilePath,
            path.join(remotePath, path.basename(localFilePath)),
            (err) => {
              conn.end();
              if (err) {
                reject(err);
              } else {
                resolve();
              }
            },
          );
        });
      });

      conn.on('error', (err) => {
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

  getFileName(ruta) {
    // Si no se encuentra ninguna barra, se devuelve la ruta original.
    const ultimaBarraIndex = ruta.lastIndexOf('/');
    if (ultimaBarraIndex !== -1) {
      return ruta.slice(ultimaBarraIndex); // Devuelve desde la última barra hasta el final.
    }
    return ruta;
  }
}
