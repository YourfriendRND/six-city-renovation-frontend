import { MIN_PASSWORD_LENGTH } from '../constants';

export function validatePassword (password: string): string | undefined {
  switch (true) {
    case !password:
      return 'password required';
    case password.length < MIN_PASSWORD_LENGTH:
      return `Password length should be at least ${MIN_PASSWORD_LENGTH} characters`;
    case !/(?=.*[A-Za-z])(?=.*\d)/.test(password):
      return 'Password must have at least one letter and one number';
    default:
      return undefined;
  }
};
