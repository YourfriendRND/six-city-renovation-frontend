'use client';
import './login-page.css'
import { useEffect } from 'react';
import Link from 'next/link';

import { Header } from '@/shared/components';
import { useAppDispatch, useAppSelector, AppDispatch } from '@/shared/store';
import { getCities } from '@/shared/store/slices/places/places.selectors';
import { fetchCities } from '@/shared/store/async-actions';
import { findRandomListItem } from '@/shared/utils';

export default function LoginPage(): React.JSX.Element {

    const dispatch: AppDispatch = useAppDispatch();
      
    const cities = useAppSelector(getCities);

    useEffect(() => {
        if (!cities.length) {
            dispatch(fetchCities());
        }

    }, [cities.length, dispatch])

    const randomCity = findRandomListItem(cities);;
    const previewCityUrl = randomCity ? `${process.env.NEXT_PUBLIC_API_URL}/files/${randomCity?.preview?.id}` : '';

    if (randomCity) {
        return (
            <div className="page page--gray page--login" style={{ '--city-image': `url(${previewCityUrl})` } as React.CSSProperties} >
                <Header isAuthPage={true} />
    
                <main className="page__main page__main--login">
                    <div className="page__login-container container">
                        <section className="login">
                            <h1 className="login__title">Sign In</h1>
                            <form className="login__form form" action="#" method="post">
                            <div className="login__input-wrapper form__input-wrapper">
                                <label className="visually-hidden">E-mail</label>
                                <input className="login__input form__input" type="email" name="email" placeholder="Email" required />
                            </div>
                            <div className="login__input-wrapper form__input-wrapper">
                                <label className="visually-hidden">Password</label>
                                <input className="login__input form__input" type="password" name="password" placeholder="Password" required />
                            </div>
                            <button className="login__submit form__submit button" type="submit">Sign In</button>
                            </form>
                            <div className="login__register">
                                <span>Don&apos;t have an account? </span>
                                <Link href="/register" className="login__register-link">Sign Up</Link>
                            </div>
                        </section>
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
    }

    return <>заглушка</>
}
