import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { CreateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

describe('UsersService', () => {
  let usersService: UserService;
  let create: jest.Mock;
  let findOne: jest.Mock;
  let save: jest.Mock;

  beforeEach(async () => {
    create = jest.fn();
    findOne = jest.fn();
    save = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create,
            findOne,
            save,
          },
        },
      ],
    }).compile();

    usersService = module.get<UserService>(UserService);
  });

  const user: User = new User();
  user.id = 1;
  user.password = 'test_password';
  user.email = 'test@email.com';
  user.name = 'Test User';
  user.createdAt = '2021-01-13 21:45:21.067860';
  user.updatedAt = '2021-01-13 21:45:21.067860';

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('on getting a user by email', () => {
    describe('existing in the database', () => {
      beforeEach(() => {
        findOne.mockReturnValue(Promise.resolve(user));
      });

      it('should return the user', async () => {
        const foundUser = await usersService.getUserByEmail('test@email.com');
        expect.assertions(3);
        expect(findOne).toBeCalledWith({ email: user.email });
        expect(findOne).toHaveBeenCalledTimes(1);
        expect(foundUser).toEqual(user);
      });
    });

    describe('not existing in the database', () => {
      beforeEach(() => {
        findOne.mockReturnValue(Promise.resolve(undefined));
      });

      it('should return undefined', async () => {
        const foundUser = await usersService.getUserByEmail('fake@email.com');
        expect.assertions(3);
        expect(findOne).toBeCalledWith({ email: 'fake@email.com' });
        expect(findOne).toHaveBeenCalledTimes(1);
        expect(foundUser).toEqual(undefined);
      });
    });
  });

  describe('on getting a user by id', () => {
    describe('existing in the database', () => {
      beforeEach(() => {
        findOne.mockReturnValue(Promise.resolve(user));
      });

      it('should return the user', async () => {
        const foundUser = await usersService.getUserById(1);
        expect.assertions(3);
        expect(findOne).toBeCalledWith({ id: user.id });
        expect(findOne).toHaveBeenCalledTimes(1);
        expect(foundUser).toEqual(user);
      });
    });

    describe('not existing in the database', () => {
      beforeEach(() => {
        findOne.mockReturnValue(Promise.resolve(undefined));
      });

      it('should throw an error', async () => {
        expect.assertions(3);

        await expect(usersService.getUserById(2)).rejects.toStrictEqual(
          new HttpException('User not found!', HttpStatus.NOT_FOUND),
        );

        expect(findOne).toBeCalledWith({ id: 2 });
        expect(findOne).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('on creating a new user', () => {
    beforeEach(() => {
      create.mockResolvedValue(user);
      save.mockReturnValue(Promise.resolve(user));
    });

    it('should return the new user', async () => {
      const newUserData: CreateUserDto = {
        name: user.name,
        email: user.email,
        password: user.password,
      };

      const newUser = await usersService.createUser(newUserData);
      expect.assertions(5);
      expect(create).toBeCalledWith(newUserData);
      expect(create).toHaveBeenCalledTimes(1);
      expect(save).toBeCalledWith(user);
      expect(save).toHaveBeenCalledTimes(1);
      expect(newUser).toEqual(user);
    });
  });
});
