import { createAsyncThunk } from '@reduxjs/toolkit';

import { ShortPlaceWrapper } from '@/shared/types';
import { Cities } from '@/shared/constants';
import { ApiRequest } from '@/shared/types/api-request.type';

export const fetchPlaces = createAsyncThunk<ShortPlaceWrapper, Cities, ApiRequest>('places/fetchPlaces', async (
    city: Cities,
    { extra: api }
) => {
    const { data } = await api.get<ShortPlaceWrapper>(`/places/${city}`);
    
    return data;
});
