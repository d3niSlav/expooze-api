import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  readonly id: number;

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'The min length of password is 8' })
  @MaxLength(20, {
    message: `The password can't accept more than 20 characters`,
  })
  // @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,20}$/, {
  //   message:
  //     'A password at least contains one numeric digit, one supercase char and one lowercase char',
  // })
  readonly password: string;
}
