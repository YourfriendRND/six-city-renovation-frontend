import { StoreNamespace } from '@/shared/constants';
import { State } from '../../store';

export const getIsSignUp = (state: State): boolean => state[StoreNamespace.Auth].isSignUp;
