import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../store';

export type ApiRequest = {
 dispatch: AppDispatch;
 extra: AxiosInstance;
 state: State,
}
