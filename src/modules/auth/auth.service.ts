import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EmailOptions, MailgunService } from '@nextnm/nestjs-mailgun';
import * as bcrypt from 'bcrypt';

import {
  getResetPasswordMailTemplate,
  userEntityToClass,
} from './auth.helpers';
import ChangePasswordDto from './dto/change-password.dto';
import ForgotPasswordDto from './dto/forgot-password.dto';
import RegisterDto from './dto/register.dto';
import { UserDto } from '../user/user.dto';
import { UserService } from '../user/user.service';
import PostgresErrorCode from '../../database/postgresErrorCode.enum';
import { ValidationException } from '../../exceptions/validation-exception.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private emailService: MailgunService,
    private configService: ConfigService,
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
      const baseRoute = this.configService.get('CLIENT_BASE_ROUTE');
      const forgottenPasswordUrl = `${baseRoute}/reset?token=${token}`;
      const data: EmailOptions = {
        from: this.configService.get('OFFICE_EMAIL_DOMAIN'),
        to: forgotPasswordDto.email,
        subject: 'Password reset',
        html: getResetPasswordMailTemplate(forgottenPasswordUrl),
      };

      await this.emailService.sendEmail(data);
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
