'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import './header.css';
import { Navigation } from '../navigation/Navigation';
import { User } from '../../types';

export function Header(): React.JSX.Element {
    const [user] = useState<User | null>(null); // Проверка на авторизацию
    
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
                    <Navigation email={user?.email} favoriteCount={user?.favoriteCount} isAuth={Boolean(user)} />
                </div>
            </div>
        </header>
    );
}