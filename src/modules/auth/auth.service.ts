import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import RegisterDto from './register.dto';
import PostgresErrorCode from '../../database/postgresErrorCode.enum';
import { UserService } from '../user/user.service';
import { userEntityToClass } from './auth.helpers';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const existingUser = await this.usersService.getUserByEmail(email);

    if (!existingUser) {
      throw new HttpException(
        'Wrong email or password!',
        HttpStatus.BAD_REQUEST,
      );
    }

    await AuthService.verifyPassword(password, existingUser.password);

    return {
      access_token: this.jwtService.sign(userEntityToClass(existingUser)),
    };
  }

  async register(registrationData: RegisterDto) {
    try {
      return userEntityToClass(
        await this.usersService.createUser(registrationData),
      );
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that email already exists!',
          HttpStatus.BAD_REQUEST,
        );
      }

      throw new HttpException(
        'Something went wrong!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private static async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );

    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong email or password!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
