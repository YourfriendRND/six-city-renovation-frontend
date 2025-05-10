import { createAsyncThunk } from '@reduxjs/toolkit';

import { ShortPlaceWrapper, City, Place } from '@/shared/types';
import { ApiRequest } from '@/shared/types/api-request.type';

export const fetchPlaces = createAsyncThunk<ShortPlaceWrapper, string, ApiRequest>('places/fetchPlaces', async (
    cityId: string,
    { extra: api }
) => {
    const { data } = await api.get<ShortPlaceWrapper>(`/places/cities/${cityId}`);
    
    return data;
});

export const fetchCities = createAsyncThunk<City[], undefined, ApiRequest>('places/fetchCities', async (
    _arg,
    { extra: api }
) => {
    const { data } = await api.get<City[]>(`/places/cities`);

    return data;
});

export const fetchPlaceDetails = createAsyncThunk<Place, string, ApiRequest>('places/fetchPlaceDetails', async (
    id: string,
    { extra: api }
) => {
    const { data } = await api.get(`/places/${id}`);

    return data;
});
