import { JSX } from 'react';
import Link from 'next/link';

import './navigation.css';
import { getCurrentUser, getIsAuthorized } from '@/shared/store/slices/auth/auth.selectors';
import { useAppSelector, useAppDispatch } from '@/shared/store';
import { logout } from '@/shared/store/async-actions/auth/auth-async-actions';

type NavigationProps = {
    favoriteCount?: number;
}

export function Navigation({ favoriteCount }: NavigationProps): JSX.Element {
    const dispatch = useAppDispatch();
    const user = useAppSelector(getCurrentUser);
    const isAuth = useAppSelector(getIsAuthorized);

    const handleLogout = async (evt: React.SyntheticEvent): Promise<void> => {
        evt.preventDefault();
        await dispatch(logout());
    }

    return <nav className="header__nav">
        <ul className="header__nav-list">
            {isAuth && user && <li className="header__nav-item user">
                <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">{user?.name}</span>
                    <span className="header__favorite-count">{favoriteCount}</span>
                </a>
            </li>}
            {isAuth && <li className="header__nav-item">
                <a className="header__nav-link" href="#" onClick={handleLogout}>
                    <span className="header__signout">Sign out</span>
                </a>
            </li>}
            {!isAuth && <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" href="/login">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>}
        </ul>
    </nav>
}
