import { User } from './user.type';

export type SimplifiedUserDto = Omit<User, 'favoriteCount' | 'email'>;
