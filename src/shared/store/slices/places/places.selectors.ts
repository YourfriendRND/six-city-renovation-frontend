import { City, ShortPlace } from '@/shared/types';
import { State } from '../../store';
import { StoreNamespace } from '@/shared/constants';

export const getPlaces = (state: State): ShortPlace[] => state[StoreNamespace.Places].places;

export const getActiveCity = (state: State): City | null => state[StoreNamespace.Places].activeCity;

export const getCities = (state: State): City[] => state[StoreNamespace.Places].cities;

export const getActivePlaceCard = (state: State): ShortPlace | null => state[StoreNamespace.Places].activePlaceCard;
