'use client'
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { useMapEvents } from 'react-leaflet';

import { ShortPlace } from '../types';
import { getActivePlaceCard } from '../store/slices/places/places.selectors';
import { useAppSelector } from '../store';
import { useEffect } from 'react';

const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

type CustomMarkerProps = {
    place: ShortPlace;
}

export function CustomMarker ({ place }: CustomMarkerProps): React.JSX.Element {
    const L = require("leaflet");
    const icon = L.icon({
        iconUrl: '/img/pin.svg',
        iconSize: [20, 30],
        iconAnchor: [10, 15],
    });

    const activeIcon = L.icon({
        iconUrl: '/img/pin-active.svg',
        iconSize: [20, 30],
        iconAnchor: [10, 15],
    });

    const activeCard = useAppSelector(getActivePlaceCard);

    const isAciveCard = place.id === activeCard?.id;

    const map = useMapEvents({})

    useEffect(() => {
        if (isAciveCard) {
            map.flyTo([place.latitude, place.longitude], map.getZoom(), {
                duration: 0.7
            })
        }
    }, [isAciveCard])

    return (<>
        <Marker position={[place.latitude, place.longitude]} icon={isAciveCard ? activeIcon : icon} >
            <Popup>
               {place.name}
            </Popup>
        </Marker>
    </>);
}