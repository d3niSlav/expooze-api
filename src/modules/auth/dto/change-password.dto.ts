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
  @MinLength(8, { message: 'Password must be at least 8 characters long!' })
  @MaxLength(20, {
    message: `Password must be no more than 20 characters long!`,
  })
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,20}$/, {
    message:
      'Password must contain one number, one uppercase and one lowercase character!',
  })
  readonly password: string;
}

export default ChangePasswordDto;
