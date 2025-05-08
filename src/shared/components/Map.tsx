'use client'

import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { ShortPlace } from '../types';
import { City } from '../types';
import { CustomMarker } from './CustomMarker';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });

type MapProps = {
    city: City;
    places: ShortPlace[],
}

const DEFAULT_MAP_ZOOM = 13;
 
export function Map({ city, places }: MapProps): React.JSX.Element {    
    return (
        <section className="cities__map map">
            <MapContainer center={[city.latitude, city.longitude]} zoom={DEFAULT_MAP_ZOOM} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
                />
                {places.map((place) => <CustomMarker key={place.id} place={place}/>)}
            </MapContainer>
        </section>
    );
}
