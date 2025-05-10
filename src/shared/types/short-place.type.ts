import { Place } from './place.type';

export type ShortPlace = Omit<Place, 'description' | 'bedrooms' | 'adultsCount' | 'features' | 'host' | 'images'>;

export type ShortPlaceWrapper = {
    places: ShortPlace[];
    total: number;
}
