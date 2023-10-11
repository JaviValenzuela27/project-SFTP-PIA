import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from './database.service';

describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseService],
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
    await service.connectToDatabase();
  });

  afterAll(async () => {
    await service.closeDatabaseConnection();
  });

  it('should execute a query', async () => {
    // Act
    const sql = 'SELECT * FROM smsdev.routes';
    const [result, fields] = await service.query(sql);

    // Assert
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBeTruthy();
    expect(fields).toBeDefined();
  });
});
