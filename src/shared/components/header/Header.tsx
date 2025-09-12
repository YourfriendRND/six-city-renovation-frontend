import Image from 'next/image';
import Link from 'next/link';

import './header.css';
import { Navigation } from '../navigation/Navigation';
import { User } from '../../types';

type HeaderProps = {
    user?: User | null,
    isAuthPage: boolean;
}

export function Header({ user, isAuthPage }: HeaderProps): React.JSX.Element { 
    return (
        <header className="header">
            <div className="container">
                <div className="header__wrapper">
                    <div className="header__left">
                        <Link 
                            className="header__logo-link header__logo-link--active"
                            href={'/'}
                        >
                            <Image
                                src="/img/logo.svg"
                                className="header__logo"
                                alt="6 cities logo"
                                width={81}
                                height={41} />
                        </Link>
                    </div>
                    {isAuthPage ? <></> : <Navigation favoriteCount={user?.favoriteCount} /> }
                </div>
            </div>
        </header>
    );
}
