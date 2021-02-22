import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { userEntityToClass } from './auth.helpers';
import ChangePasswordDto from './dto/change-password.dto';
import ForgotPasswordDto from './dto/forgot-password.dto';
import RegisterDto from './dto/register.dto';
import { UserDto } from '../user/user.dto';
import { UserService } from '../user/user.service';
import { ValidationException } from '../../exceptions/validation-exception.dto';
import PostgresErrorCode from '../../database/postgresErrorCode.enum';

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
        throw new ValidationException({
          email: ['User with that email already exists!'],
        });
      }

      throw new HttpException(
        'Something went wrong!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async resetPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.usersService.getUserByEmail(
      forgotPasswordDto.email,
    );

    if (user) {
      const token = this.jwtService.sign(userEntityToClass(user));
      const forgottenPasswordUrl = `/auth/reset?token=${token}`;

      // TODO send email with the URL
      console.log(forgottenPasswordUrl);
    }
  }

  async changePassword(token: string, changePasswordDto: ChangePasswordDto) {
    let user: UserDto;

    try {
      user = this.jwtService.verify(token);
    } catch (error) {
      throw new HttpException(
        'The reset password token has expired!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const { email } = user;
    const currentUser = await this.usersService.getUserByEmail(email);

    if (!currentUser) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }

    await this.usersService.changeUserPassword({
      id: currentUser.id,
      password: changePasswordDto.password,
    });
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
      throw new ValidationException({
        email: ['Wrong email or password!'],
      });
    }
  }
}
