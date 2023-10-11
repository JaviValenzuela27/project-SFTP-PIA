import { SftpService } from './sftp.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('SftpService', () => {
  let sftpService: SftpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SftpService],
    }).compile();

    sftpService = module.get<SftpService>(SftpService);
  });

  it('should be defined', () => {
    expect(sftpService).toBeDefined();
  });

  it('should upload a file to SFTP server', async () => {
    const host = '10.120.1.68';
    const port = 22; // Or your SFTP port
    const username = 'javier_valenzuela';
    const password = '123456789';
    const localFilePath = '/home/javier/miarchivo.txt';
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
    } catch (error) {
      throw error;
    }
  });
});
