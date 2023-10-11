import { SftpService } from './files/sftp.service';
import { DatabaseService } from './database/database.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('FILES-SFTP-BDD', () => {
  let sftpService: SftpService;
  let service: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SftpService, DatabaseService],
    }).compile();

    sftpService = module.get<SftpService>(SftpService);
    service = module.get<DatabaseService>(DatabaseService);
    await service.connectToDatabase();
  });

  afterAll(async () => {
    await service.closeDatabaseConnection();
  });

  it('should be defined', () => {
    expect(sftpService).toBeDefined();
    expect(service).toBeDefined();
  });

  it('Upload to server and save in bdd', async () => {
    const host = '10.120.1.68';
    const port = 22; // Or your SFTP port
    const username = 'javier_valenzuela';
    const password = '123456789';
    const localFilePath = '/home/javier/miarchivo.txt';
    const filename = sftpService.getFileName(localFilePath);
    const remotePath = '/files';

    try {
      await sftpService.uploadFileToSFTP(
        host,
        port,
        username,
        password,
        localFilePath,
        remotePath,
      );

      const sql = 'INSERT INTO routes (path) VALUES (?)';
      const values = [remotePath + filename];

      try {
        await service.query(sql, values);
      } catch (error) {
        throw error;
      }
    } catch (error) {
      throw error;
    }
  });
});
