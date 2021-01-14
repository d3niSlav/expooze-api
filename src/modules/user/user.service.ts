import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto, UserPasswordDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getUserByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ email });
  }

  async getUserById(id: number) {
    const user = await this.usersRepository.findOne({ id });

    if (!user) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async createUser(userData: CreateUserDto) {
    const newUser = await this.usersRepository.create(userData);

    await this.usersRepository.save(newUser);

    return newUser;
  }

  async changeUserPassword({ id, password }: UserPasswordDto) {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }

    user.password = password;

    await this.usersRepository.save(user);
  }
}
