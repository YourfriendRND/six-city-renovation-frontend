import { StoreNamespace } from '@/shared/constants';
import { State } from '../../store';
import { User } from '@/shared/types';

export const getIsSignUp = (state: State): boolean => state[StoreNamespace.Auth].isSignUp;

export const getLoggingProcess = (state: State): boolean => state[StoreNamespace.Auth].isLoggingProcess;

export const getCurrentUser = (state: State): User | null => state[StoreNamespace.Auth].currentUser;

export const getIsAuthorized = (state: State): boolean => state[StoreNamespace.Auth].isAuthorized;
