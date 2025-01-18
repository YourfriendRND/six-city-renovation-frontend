import { JSX } from 'react';

type SortOptionProps = {
    optionName: string;
    isActive: boolean;
    setActive: (name: string) => void;
}


export function SortOption({ optionName, isActive, setActive }: SortOptionProps): JSX.Element {
    return <li 
        className={`places__option ${isActive ? 'places__option--active' : ''}`} tabIndex={0} onClick={() => setActive(optionName)}>
        {optionName}
    </li>
}
