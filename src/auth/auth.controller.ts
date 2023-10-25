// import {
//   Controller,
//   Post,
//   Body,
//   HttpStatus,
//   HttpException,
// } from '@nestjs/common';
// import {
//   ApiTags,
//   ApiResponse,
//   ApiOperation,
//   ApiBadRequestResponse,
//   ApiUnauthorizedResponse,
// } from '@nestjs/swagger';
// import { AdAuthService } from './ad-auth.service';

// @ApiTags('Autorizacion') // Asocia el controlador con una etiqueta Swagger
// @Controller('auth')
// export class AuthController {
//   constructor(private readonly adAuthService: AdAuthService) {}

//   @Post()
//   @ApiOperation({ summary: 'Autenticar un usuario' })
//   @ApiResponse({ status: HttpStatus.OK, description: 'Autenticación exitosa' })
//   @ApiBadRequestResponse({ description: 'Credenciales incorrectas' })
//   @ApiUnauthorizedResponse({ description: 'Error de autenticación' })
//   async authenticateUser(
//     @Body() { username, password }: { username: string; password: string },
//   ) {
//     try {
//       const isAuthenticated = await this.adAuthService.authenticateUser(
//         username,
//         password,
//       );
//       if (isAuthenticated) {
//         return { message: 'Authentication successful' };
//       } else {
//         throw new HttpException(
//           'Authentication failed',
//           HttpStatus.UNAUTHORIZED,
//         );
//       }
//     } catch (error) {
//       throw new HttpException(
//         'Authentication error',
//         HttpStatus.INTERNAL_SERVER_ERROR,
//       );
//     }
//   }
// }

import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AdAuthService } from './ad-auth.service';
import { UserDto } from './userdto';

@ApiTags('Autorizacion')
@Controller('auth')
export class AuthController {
  constructor(private readonly adAuthService: AdAuthService) {}

  @Post()
  @ApiOperation({ summary: 'Autenticar un usuario en el AD' })
  async authenticateUser(@Body() userDto: UserDto) {
    try {
      const isAuthenticated = await this.adAuthService.authenticateUser(
        userDto.username,
        userDto.password,
      );
      if (isAuthenticated) {
        return { message: 'Authentication successful' };
      } else {
        throw new HttpException(
          'Authentication failed',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } catch (error) {
      throw new HttpException(
        'Authentication error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

// import {
//   Controller,
//   Post,
//   Body,
//   HttpStatus,
//   HttpException,
// } from '@nestjs/common';
// import { AdAuthService } from './ad-auth.service';

// @Controller('auth') // Define la ruta base para este controlador, por ejemplo, /auth
// export class AuthController {
//   constructor(private readonly adAuthService: AdAuthService) {}

//   @Post('authenticate')
//   async authenticateUser(
//     @Body() { username, password }: { username: string; password: string },
//   ) {
//     try {
//       const isAuthenticated = await this.adAuthService.authenticateUser(
//         username,
//         password,
//       );
//       if (isAuthenticated) {
//         return { message: 'Authentication successful' };
//       } else {
//         throw new HttpException(
//           'Authentication failed',
//           HttpStatus.UNAUTHORIZED,
//         );
//       }
//     } catch (error) {
//       throw new HttpException(
//         'Authentication error',
//         HttpStatus.INTERNAL_SERVER_ERROR,
//       );
//     }
//   }
// }
