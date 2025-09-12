'use client';
import './login-page.css'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Header } from '@/shared/components';
import { useAppDispatch, useAppSelector, AppDispatch } from '@/shared/store';
import { getCities } from '@/shared/store/slices/places/places.selectors';
import { fetchCities } from '@/shared/store/async-actions';
import { findRandomListItem } from '@/shared/utils';
import { SignIn } from '@/shared/components';
import { getCurrentUser, getIsAuthorized } from '@/shared/store/slices/auth/auth.selectors';
import { whoAmI } from '@/shared/store/async-actions/auth/auth-async-actions';

export default function LoginPage(): React.JSX.Element {
    const dispatch: AppDispatch = useAppDispatch();
    const router = useRouter();
    const currentUser = useAppSelector(getCurrentUser);
    const isAuthorized = useAppSelector(getIsAuthorized);

    const cities = useAppSelector(getCities);

    useEffect(() => {
        if (!currentUser && !isAuthorized) {
            dispatch(whoAmI());
        }

        if (currentUser) {
            router.push('/');         
        }

        if (!cities.length) {
            dispatch(fetchCities());
        }

    }, [
        cities.length, 
        dispatch, 
        currentUser, 
        router, 
        isAuthorized
    ])

    const randomCity = findRandomListItem(cities);;
    const previewCityUrl = randomCity ? `${process.env.NEXT_PUBLIC_API_URL}/files/${randomCity?.preview?.id}` : '';

    if (randomCity && !currentUser) {
        return (
            <div className="page page--gray page--login" style={{ '--city-image': `url(${previewCityUrl})` } as React.CSSProperties} >
                <Header isAuthPage={true} />
    
                <main className="page__main page__main--login">
                    <div className="page__login-container container">
                        <SignIn />         
                        <section className="locations locations--login locations--current">
                            <div className="locations__item">
                            <a className="locations__item-link" href="#">
                                <span>{randomCity.name}</span>
                            </a>
                            </div>
                        </section>
                    </div>
                </main>            
            </div>
        )
    } else {
        return <>Redirect...</>
    }
}
