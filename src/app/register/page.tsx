'use client';
import './register-page.css';
import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Header, SignUp } from '@/shared/components';
import { useAppDispatch, useAppSelector, AppDispatch } from '@/shared/store';
import { getCities } from '@/shared/store/slices/places/places.selectors';
import { fetchCities } from '@/shared/store/async-actions';
import { findRandomListItem } from '@/shared/utils';
import { getIsSignUp } from '@/shared/store/slices/auth/auth.selectors';
import { unsetIsSignUp } from '@/shared/store/slices/auth';

export default function RegisterPage(): React.JSX.Element {
    const dispatch: AppDispatch = useAppDispatch();
    const router = useRouter();
    
    const cities = useAppSelector(getCities);
    const isSignUp = useAppSelector(getIsSignUp);

    useEffect(() => {
        if (!cities.length) {
            dispatch(fetchCities());
        }
    }, [cities.length, dispatch]);

    useEffect(() => {
        if (isSignUp) {
            router.push('/login');
        }

        dispatch(unsetIsSignUp());
    }, [isSignUp, router, dispatch]);

    const randomCity = findRandomListItem(cities);
    const previewCityUrl = randomCity ? `${process.env.NEXT_PUBLIC_API_URL}/files/${randomCity?.preview?.id}` : '';

    if (randomCity) {
        return (
            <div className="page page--gray page--register" style={{ '--city-image': `url(${previewCityUrl})` } as React.CSSProperties} >
                <Header isAuthPage={true} />
    
                <main className="page__main page__main--register">
                    <div className="page__register-container container">
                        <SignUp />
                        <section className="locations locations--register locations--current">
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
    }

    return <>заглушка</>
}
