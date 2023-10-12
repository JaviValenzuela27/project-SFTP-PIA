// Importaciones
import { Injectable } from '@nestjs/common';
import winston, { transports, createLogger, format } from 'winston';
import { mkdirSync } from 'fs';
import { join } from 'path';
// *******************************************************************
@Injectable()
// Clase para llevar un registro de los errores
export class LoggerService {
  private logDir: string;
  private logFileName: string;
  private logger: winston.Logger;

  constructor() {
    this.logDir = './logs_test';
    this.logFileName = 'app-logs';

    this.ensureLogDirectoryExists();

    this.logger = createLogger({
      level: 'info',
      format: format.combine(format.timestamp(), format.json()),
      transports: [
        new transports.File({
          filename: this.getLogFilePath(),
          handleExceptions: true,
        }),
      ],
    });
  }

  private ensureLogDirectoryExists() {
    mkdirSync(this.logDir, { recursive: true });
  }

  private getLogFilePath() {
    const currentDate = new Date().toISOString().slice(0, 10);
    return join(this.logDir, `${currentDate}-${this.logFileName}.log`);
  }

  info(message: string) {
    this.logger.info(message);
  }

  error(message: string, error: Error) {
    this.logger.error(message, { error });
  }
}
