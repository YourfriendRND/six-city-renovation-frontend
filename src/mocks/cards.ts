type Card = {
    id: string;
    imgSrc: string;
    price: number;
    rating: number;
    name: string;
    type: string;
    city: string;
    isPremium: boolean; 
}

export const cards: Card[] = [
    {
        id: '58b9adc6-d05b-4f48-a4c0-bb7cf5d06dbd',
        imgSrc: '/img/apartment-01.jpg',
        price: 120,
        rating: 2.2,
        name: 'Beautiful & luxurious apartment at great location',
        type: 'Apartment',
        city: 'New York',
        isPremium: true, 
    },
    {
        id: 'ec274dd6-6251-4332-9120-ac129e16a2fa',
        imgSrc: '/img/room.jpg',
        price: 80,
        rating: 3.5,
        name: 'Wood and stone place',
        type: 'Private room',
        city: 'New York',
        isPremium: false,
    },
    {
        id: 'b32c89c9-78aa-4ce3-ba95-28f9117c5272',
        imgSrc: '/img/apartment-02.jpg',
        price: 130,
        rating: 4.2,
        name: 'Canal View Prinses Hotel',
        type: 'Apartment',
        city: 'New York',
        isPremium: true,
    },
    {
        id: 'a78add4f-c48f-446f-85a8-561fe0e8bac7',
        imgSrc: '/img/apartment-03.jpg',
        price: 180,
        rating: 5,
        name: 'Nice, cozy, warm big bed apartment',
        type: 'Apartment',
        city: 'New York',
        isPremium: false,
    },
];