import { JSX } from 'react';

type LocationItemProps = {
  name: string;
  isActive?: boolean;
  setActive: (name: string) => void
}

export function LocationItem({name, isActive, setActive}: LocationItemProps): JSX.Element {
    return <li className="locations__item">
    <a className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`} href="#" onClick={() => {
      setActive(name);
    }}>
      <span>{name}</span>
    </a>
  </li>
}