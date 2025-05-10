import { Preview } from './preview.type';
import { City } from './city.type';
import { User } from './user.type';

export type Place = {
    id: string;
    name: string;
    description: string;
    isPremium: boolean;
    type: string;
    bedrooms: number;
    adultsCount: number;
    price: number;
    features: string[] | null;
    city: Pick<City, 'name'>;
    latitude: number;
    longitude: number;
    host: User;
    images: Preview[];
    preview: Preview;
    rating?: number; // TODO: После подключения API комментариев
}
