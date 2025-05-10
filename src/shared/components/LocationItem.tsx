import Link from 'next/link';
import { JSX } from 'react';

import { setActiveCity } from '@/shared/store/slices/places';
import { getActiveCity } from '../store/slices/places/places.selectors';
import { useAppSelector, useAppDispatch } from '../store';
import { City } from '../types';

type LocationItemProps = {
  city: City;
}

export function LocationItem({ city }: LocationItemProps): JSX.Element {
  const { id, name } = city;
  
  const dispatch = useAppDispatch();
  const activeCity = useAppSelector(getActiveCity);
  
  const isActive = id === activeCity?.id;
  
  return <li className="locations__item">
    <Link 
      className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`}
      href={'/'}
      onClick={() => {
        dispatch(setActiveCity(city));
      }}
    >
      <span>{name}</span>
    </Link>
  </li>
}