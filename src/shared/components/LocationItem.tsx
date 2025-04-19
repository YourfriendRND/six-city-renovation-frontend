import { JSX } from 'react';
import { Cities } from '../constants';
import { setActiveCity } from '@/shared/store/slices/places';
import { getActiveCity } from '../store/slices/places/places.selectors';
import { useAppSelector, useAppDispatch } from '../store';

type LocationItemProps = {
  name: Cities;
}

export function LocationItem({ name }: LocationItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const activeCity = useAppSelector(getActiveCity);
  
  const isActive = name === activeCity;
  
  return <li className="locations__item">
    <a className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`} href="#" onClick={() => {
      dispatch(setActiveCity(name));
    }}>
      <span>{name}</span>
    </a>
  </li>
}