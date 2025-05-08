import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ShortPlace, City } from '@/shared/types';
import { fetchPlaces, fetchCities } from '../../async-actions/places/places-async-actions';
import { StoreNamespace } from '@/shared/constants';

export type PlacesState = {
    cities: City[];
    places: ShortPlace[];
    total: number;
    activeCity: City | null;
    activePlaceCard: ShortPlace | null;
};

export const initialState: PlacesState = {
    cities: [],
    places: [],
    total: 0,
    activeCity: null,
    activePlaceCard: null,
};

export const placesSlice = createSlice({
    name: StoreNamespace.Places,
    initialState,
    reducers: {
        setActiveCity: (state: PlacesState, action: PayloadAction<City>): void => {
            state.activeCity = action.payload;
        },
        setActivePlaceCardId: (state: PlacesState, action: PayloadAction<ShortPlace | null>): void => {
            state.activePlaceCard = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlaces.fulfilled, (state, action) => {
                state.places = action.payload.places;
                state.total = action.payload.total;
            })
            .addCase(fetchCities.fulfilled, (state, action) => {
                state.cities = action.payload;
                state.activeCity = action.payload[0];
            });
    },
});

const { actions, reducer } = placesSlice;

export const { setActiveCity, setActivePlaceCardId } = actions;

export default reducer;
