import { UserDto } from '../user/user.dto';
import { User } from '../user/user.entity';

export const userEntityToClass = (userData: User): UserDto => {
  const { id, name, email } = userData;
  return { id, name, email } as UserDto;
};
