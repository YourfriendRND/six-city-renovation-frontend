import { MIN_USER_NAME_LENGTH, MAX_USER_NAME_LENGTH } from '../constants';

export function validateUserName (username: string): string | undefined {
    switch (true) {
        case !username.trim():
            return 'User name required';
        case username.length < MIN_USER_NAME_LENGTH:
            return `User name length should be at least ${MIN_USER_NAME_LENGTH} characters`;
        case username.length > MAX_USER_NAME_LENGTH:
            return `User name length should be at most ${MAX_USER_NAME_LENGTH} characters`;
        default:
            return undefined;
    }
};
