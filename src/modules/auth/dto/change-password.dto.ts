import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'The min length of password is 8' })
  @MaxLength(20, {
    message: `The password can't accept more than 20 characters`,
  })
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,20}$/, {
    message:
      'The password must contain one number, one uppercase and one lowercase character',
  })
  readonly password: string;
}

export default ChangePasswordDto;
