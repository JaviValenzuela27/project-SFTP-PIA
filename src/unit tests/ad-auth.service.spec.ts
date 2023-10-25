// ad-auth.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { AdAuthService } from '../auth/ad-auth.service';

describe('AdAuthService', () => {
  let service: AdAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdAuthService],
    }).compile();

    service = module.get<AdAuthService>(AdAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should authenticate a user with correct credentials', async () => {
    const username = 'javier.valenzuela@palmerola-airport.com';
    const password = 'Eraseunavez2023';

    jest.setTimeout(100000);

    const isAuthenticated = await service.authenticateUser(username, password);
    expect(isAuthenticated).toBe(true);
  });

  it('should not authenticate a user with incorrect credentials', async () => {
    const username = 'sjaksjaksvier.valenzuela';
    const password = 'Eraseunavez2023';

    try {
      await service.authenticateUser(username, password);
      // Si la autenticación tiene éxito, lanzamos una excepción
      throw new Error('Authentication should have failed');
    } catch (error) {
      // Verificamos que se haya lanzado una excepción
      expect(error.message).toBe('Invalid Credentials');
    }
  });
});
