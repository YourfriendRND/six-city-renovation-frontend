import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiRequest } from '@/shared/types/api-request.type';
import { AuthUserDto, CreateUserDto } from '@/shared/types';
import { SimplifiedUserDto } from '@/shared/types';
import { AsyncActions } from '@/shared/constants';
import { TextApiResponse, User } from '@/shared/types';

export const createUser = createAsyncThunk<SimplifiedUserDto, CreateUserDto, ApiRequest>(AsyncActions.createUser, async (
    dto: CreateUserDto,
    { extra: api }
) => {
    const { data } = await api.post<SimplifiedUserDto>('/auth/register', dto);

    return data;
})

export const loginUser = createAsyncThunk<TextApiResponse, AuthUserDto, ApiRequest>(AsyncActions.loginUser, async (
    dto: AuthUserDto,
    { extra: api }
) => {
    const { data } = await api.post<TextApiResponse>('/auth/login', dto);

    return data;
})

export const whoAmI = createAsyncThunk<User, undefined, ApiRequest>(AsyncActions.whoAmI, async (
    _arg,
    { extra: api }
) => {
    const { data } = await api.get<User>('/auth/me');

    return data;
})
