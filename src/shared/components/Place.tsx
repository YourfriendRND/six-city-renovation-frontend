'use client';
import Image from 'next/image';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../store';
import { fetchPlaceDetails } from '../store/async-actions';
import { getPlaceDetails } from '../store/slices/places/places.selectors';
import { setPlaceAsNull } from '../store/slices/places';
import { PlaceImg, PlaceFeature } from '@/shared/components';
import { calculateRating } from '../utils';

type PlaceProps = {
    id: string;
}

export function Place({ id }: PlaceProps): React.JSX.Element {
    const dispatch = useAppDispatch();
    const place = useAppSelector(getPlaceDetails);

    useEffect(() => {
        if (!place || place.id !== id) {
            dispatch(fetchPlaceDetails(id))
        }
    
    }, [id, place, dispatch]);

    useEffect(() => {
        return () => {  
            dispatch(setPlaceAsNull());
        }
    }, [dispatch])

    if (place) {
        const { 
            name, 
            images, 
            isPremium, 
            rating, 
            type, 
            bedrooms, 
            adultsCount, 
            features, 
            price, 
            description,
            host 
        } = place;

        return (
            <>
                <main className="page__main page__main--property">
                <section className="property">
                <div className="property__gallery-container container">
                    <div className="property__gallery">
                        {
                            images.map((img) => <PlaceImg key={img.id} url={img.url} name={img.name} />)
                        }
                    </div>
                </div>
                <div className="property__container container">
                    <div className="property__wrapper">
                    {
                        isPremium 
                            ? <div className="property__mark">
                                <span>Premium</span>
                            </div> 
                            : <></>
                    }
                    <div className="property__name-wrapper">
                        <h1 className="property__name">
                            {name}
                        </h1>
                        <button className="property__bookmark-button button" type="button">
                        <svg className="property__bookmark-icon" width="31" height="33">
                            <use xlinkHref="#icon-bookmark"></use>
                        </svg>
                        <span className="visually-hidden">To bookmarks</span>
                        </button>
                    </div>
                    <div className="property__rating rating">
                        <div className="property__stars rating__stars">
                        <span style={{width: calculateRating(rating || 0)}}></span>
                        <span className="visually-hidden">Rating</span>
                        </div>
                        <span className="property__rating-value rating__value">{rating || 0}</span>
                    </div>
                    <ul className="property__features">
                        <li className="property__feature property__feature--entire">
                            {type}
                        </li>
                        <li className="property__feature property__feature--bedrooms">
                            {bedrooms} Bedrooms
                        </li>
                        <li className="property__feature property__feature--adults">
                            Max {adultsCount} adults
                        </li>
                    </ul>
                    <div className="property__price">
                        <b className="property__price-value">&euro;{price}</b>
                        <span className="property__price-text">&nbsp;night</span>
                    </div>
                    <div className="property__inside">
                        <h2 className="property__inside-title">What&apos;s inside</h2>
                        <ul className="property__inside-list">
                            {
                                features?.map((feature) => <PlaceFeature key={feature} feature={feature} />)
                            }
                        </ul>
                    </div>
                    <div className="property__host">
                        <h2 className="property__host-title">Meet the host</h2>
                        <div className="property__host-user user">
                        <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                            {host.avatarUrl ? <Image 
                                className="property__avatar user__avatar"
                                src={host.avatarUrl}
                                width={74}
                                height={74}
                                alt="Host avatar"
                                unoptimized
                            /> : <></>}
                        </div>
                        <span className="property__user-name">
                            {host.name}
                        </span>
                        {
                            host.isPro 
                                ?   <span className="property__user-status">
                                        Pro
                                    </span>
                                : <></>
                        }
                        </div>
                        <div className="property__description">
                            <p className="property__text">
                                {description}
                            </p>
                        </div>
                    </div>
                    <section className="property__reviews reviews">
                        <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">0</span></h2>
                        <ul className="reviews__list">
                            {/** TODO: Need to implements reviews__item component */}
                        </ul>
                    </section>
                    </div>
                </div>
                <section className="property__map map"></section>
                </section>
                <div className="container">
                <section className="near-places places">
                    <h2 className="near-places__title">Other places in the neighbourhood</h2>
                    <div className="near-places__list places__list">
                    </div>
                </section>
                </div>
                </main>
            </>
        );
    }

    return <p>Здесь будет Not Found Page</p>
}
