import { Injectable } from '@nestjs/common';
import {
  createConnection,
  Connection,
  FieldPacket,
  RowDataPacket,
} from 'mysql2/promise';
import {
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
} from 'src/config';
@Injectable()
//Clase para gestion de la bdd
export class DatabaseService {
  private connection: Connection;

  constructor() {
    this.connectToDatabase();
  }
  //Metodo para conexion a la bdd (Gestionarlo con .env)
  async connectToDatabase() {
    this.connection = await createConnection({
      host: '10.120.1.52',
      port: 3306,
      user: 'smsadmin',
      password: 'Palmerola661i.',
      database: 'smsdev',
    });
  }
  //Metodo para cerrar la conexion con la bdd
  async closeDatabaseConnection() {
    if (this.connection) {
      await this.connection.end();
    }
  }
  //Metodo para realizar consultas a la bdd
  async query(
    sql: string,
    values: any[] = [],
  ): Promise<[RowDataPacket[], FieldPacket[]]> {
    return this.connection.execute(sql, values);
  }
}
