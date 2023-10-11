import { Injectable } from '@nestjs/common';
import {
  createConnection,
  Connection,
  FieldPacket,
  RowDataPacket,
} from 'mysql2/promise';

@Injectable()
export class DatabaseService {
  private connection: Connection;

  constructor() {
    this.connectToDatabase();
  }

  async connectToDatabase() {
    this.connection = await createConnection({
      host: '10.120.1.52',
      port: 3306,
      user: 'smsadmin',
      password: 'Palmerola661i.',
      database: 'smsdev',
    });
  }

  async closeDatabaseConnection() {
    if (this.connection) {
      await this.connection.end();
    }
  }

  async query(
    sql: string,
    values: any[] = [],
  ): Promise<[RowDataPacket[], FieldPacket[]]> {
    return this.connection.execute(sql, values);
  }
}
