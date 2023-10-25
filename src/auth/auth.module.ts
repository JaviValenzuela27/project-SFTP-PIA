import { Module } from '@nestjs/common';
import { AdAuthService } from './ad-auth.service';
import { AuthController } from './auth.controller';

@Module({
  providers: [AdAuthService],
  controllers: [AuthController],
})
export class AuthModule {}
