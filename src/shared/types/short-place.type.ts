import { Preview } from './preview.type';
import { City } from './city.type';

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
    city: Pick<City, 'name'>
    latitude: number;
    longitude: number;
    preview: Preview;
}
