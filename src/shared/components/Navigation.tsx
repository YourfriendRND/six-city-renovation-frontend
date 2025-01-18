import { JSX } from 'react';
import { User } from '@/shared/types/user.type';

type NavigationProps = {
    email?: string;
    favoriteCount?: number;
    isAuth: boolean;
}

export function Navigation({ email, favoriteCount, isAuth }: NavigationProps): JSX.Element {
    return <nav className="header__nav">
        <ul className="header__nav-list">
            {isAuth && <li className="header__nav-item user">
                <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">{email}</span>
                    <span className="header__favorite-count">{favoriteCount}</span>
                </a>
            </li>}
            {isAuth && <li className="header__nav-item">
                <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                </a>
            </li>}
            {!isAuth && <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </a>
                </li>}
        </ul>
    </nav>
}