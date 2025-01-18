'use client'

import { JSX, useState } from 'react';
import { SortOption } from './SortOption';

export const SortOptions = [
    'Popular', 
    'Price: low to high', 
    'Price: high to low', 
    'Top rated first'
];

export function Sorting(): JSX.Element {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [activeOption, setActiveOption] = useState<string>(SortOptions[0]);

    return <form className="places__sorting" action="#" method="get">
    <span className="places__sorting-caption">Sort by </span>
    <span className="places__sorting-type" tabIndex={0} onClick={() => setIsOpen(!isOpen)}>
      {activeOption}
      <svg className={`places__sorting-arrow ${isOpen ? 'places__sorting-arrow--active' : ''}`} width="7" height="4">
        <use xlinkHref="#icon-arrow-select"></use>
      </svg>
    </span>
    <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''} `} onClick={() => setIsOpen(!isOpen)}>
        {SortOptions.map((option) => <SortOption key={option} optionName={option} isActive={option === activeOption} setActive={setActiveOption} />)}
    </ul>
  </form>
}
