import { createSlice } from '@reduxjs/toolkit';
import { ShortPlace } from '@/shared/types';
import { State } from '../../store';
import { Cities, StoreNamespace } from '@/shared/constants';

export const getPlaces = (state: State): ShortPlace[] => state[StoreNamespace.Places].places;

export const getActiveCity = (state: State): Cities => state[StoreNamespace.Places].activeCity;
