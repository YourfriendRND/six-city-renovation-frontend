import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ShortPlace, City, Place } from '@/shared/types';
import { fetchPlaces, fetchCities, fetchPlaceDetails } from '../../async-actions/places/places-async-actions';
import { StoreNamespace } from '@/shared/constants';

export type PlacesState = {
    cities: City[];
    places: ShortPlace[];
    total: number;
    activeCity: City | null;
    activePlaceCard: ShortPlace | null;
    place: Place | null;
};

export const initialState: PlacesState = {
    cities: [],
    places: [],
    total: 0,
    activeCity: null,
    activePlaceCard: null,
    place: null,
};

export const placesSlice = createSlice({
    name: StoreNamespace.Places,
    initialState,
    reducers: {
        setActiveCity: (state: PlacesState, action: PayloadAction<City>): void => {
            state.activeCity = action.payload;
        },
        setActivePlaceCard: (state: PlacesState, action: PayloadAction<ShortPlace | null>): void => {
            state.activePlaceCard = action.payload;
        },
        setPlaceAsNull: (state: PlacesState): void => {
            state.place = null;
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
            })
            .addCase(fetchPlaceDetails.fulfilled, (state, action) => {
                state.place = action.payload;
            });
    },
});

const { actions, reducer } = placesSlice;

export const { setActiveCity, setActivePlaceCard, setPlaceAsNull } = actions;

export default reducer;
