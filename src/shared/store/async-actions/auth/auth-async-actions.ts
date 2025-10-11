import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError, HttpStatusCode } from 'axios';

import { ApiRequest } from '@/shared/types/api-request.type';
import { AuthUserDto, CreateUserDto } from '@/shared/types';
import { SimplifiedUserDto } from '@/shared/types';
import { AsyncActions } from '@/shared/constants';
import { TextApiResponse, User } from '@/shared/types';

const axiosErrorHandler = (err: unknown): string => {
    let message = 'An unexpected error occurred';

    if (isAxiosError(err) && err?.status) {
        switch (err.status) {
            case HttpStatusCode.InternalServerError:
                message = 'Server error. Please try again later';
                break;
            default:
                message = err.response?.data?.message;
        }
    } else if (err instanceof Error) {
        message = err.message;
    }

    return message;
}

export const createUser = createAsyncThunk<SimplifiedUserDto, CreateUserDto, ApiRequest>(AsyncActions.createUser, async (
    dto: CreateUserDto,
    { extra: api, rejectWithValue }
) => {
    try {
        const { data } = await api.post<SimplifiedUserDto>('/auth/register', dto);
    
        return data;
    } catch (err) {
        const message = axiosErrorHandler(err);

        return rejectWithValue(message);
    }
})

export const loginUser = createAsyncThunk<TextApiResponse, AuthUserDto, ApiRequest>(AsyncActions.loginUser, async (
    dto: AuthUserDto,
    { extra: api, rejectWithValue }
) => {
    try {
        const { data } = await api.post<TextApiResponse>('/auth/login', dto);

        return data;
    } catch (err) {
        const message = axiosErrorHandler(err);

        return rejectWithValue(message);
    }
    
})

export const whoAmI = createAsyncThunk<User, undefined, ApiRequest>(AsyncActions.whoAmI, async (
    _arg,
    { extra: api }
) => {
    const { data } = await api.get<User>('/auth/me');

    return data;
});


export const logout = createAsyncThunk<TextApiResponse, undefined, ApiRequest>(AsyncActions.logout, async (
    _arg,
    { extra: api }
) => {
    const { data } = await api.post<TextApiResponse>('/auth/logout', undefined)

    return data;
});
