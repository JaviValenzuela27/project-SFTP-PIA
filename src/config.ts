import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const APP_PORT = configService.get<number>('APP_PORT');
export const DB_HOST = configService.get<string>('DB_HOST');
export const DB_PORT = configService.get<number>('DB_PORT');
export const DB_USERNAME = configService.get<string>('DB_USERNAME');
export const DB_PASSWORD = configService.get<string>('DB_PASSWORD');
export const DB_DATABASE = configService.get<string>('DB_DATABASE');
export const SERVER_CORS_CONNECTION = configService.get<string>(
  'SERVER_CORS_CONNECTION',
);
export const SERVER_CORS_CONNECTIONDNS = configService.get<string>(
  'SERVER_CORS_CONNECTIONDNS',
);
export const SUBJECT = configService.get<string>('SUBJECT');
export const BODY = configService.get<string>('BODY');
export const TO = configService.get<string>('TO');
export const FILENAME = configService.get<string>('FILENAME');
export const MAIL_HOST = configService.get<string>('MAIL_HOST');
export const MAIL_PORT = configService.get<number>('MAIL_PORT');
export const MAIL_USER = configService.get<string>('MAIL_USER');
export const MAIL_PASS = configService.get<string>('MAIL_PASS');
export const LOCAL_CORS_CONNECTION = configService.get<string>(
  'LOCAL_CORS_CONNECTION',
);
