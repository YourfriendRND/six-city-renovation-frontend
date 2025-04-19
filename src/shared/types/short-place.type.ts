import { Cities } from '../constants';
import { Preview } from './preview.type';

export type ShortPlaceWrapper = {
    places: ShortPlace[];
    total: number;
}

export type ShortPlace = {
    id: string;
    name: string;
    isPremium: boolean;
    price: number;
    type: string;
    rating?: number; // TODO: После подключения API комментариев
    city: Cities;
    latitude: number;
    longitude: number;
    preview: Preview;
}
