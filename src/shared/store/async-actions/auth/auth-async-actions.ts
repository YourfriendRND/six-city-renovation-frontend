import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiRequest } from '@/shared/types/api-request.type';
import { CreateUserDto } from '@/shared/types';
import { SimplifiedUserDto } from '@/shared/types';

export const createUser = createAsyncThunk<SimplifiedUserDto, CreateUserDto, ApiRequest>('auth/createUser', async (
    dto: CreateUserDto,
    { extra: api }
) => {
    const { data } = await api.post('/auth/register', dto);

    return data;
})
