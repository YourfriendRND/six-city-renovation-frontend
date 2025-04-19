import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ShortPlace } from '@/shared/types';
import { fetchPlaces } from '../../async-actions/places/places-async-actions';
import { Cities, StoreNamespace } from '@/shared/constants';

export type PlacesState = {
    places: ShortPlace[];
    total: number;
    activeCity: Cities;
};

export const initialState: PlacesState = {
    places: [],
    total: 0,
    activeCity: Cities.Antalya,
};

export const placesSlice = createSlice({
    name: StoreNamespace.Places,
    initialState,
    reducers: {
        setActiveCity: (state: PlacesState, action: PayloadAction<Cities>) => {
            state.activeCity = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPlaces.fulfilled, (state, action) => {
            state.places = action.payload.places;
            state.total = action.payload.total;
        })
    },
});

const { actions, reducer } = placesSlice;

export const { setActiveCity } = actions;

export default reducer;
