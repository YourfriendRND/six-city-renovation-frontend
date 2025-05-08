'use client'
import Image from 'next/image';
import { JSX } from 'react';

import { calculateRating } from '../utils';
import { useAppDispatch } from '../store';
import { setActivePlaceCardId } from '../store/slices/places';
import { ShortPlace } from '../types';

type PlaceCardProps = {
    place: ShortPlace
}

export function PlaceCard({ place }: PlaceCardProps): JSX.Element {
    const { preview, price, rating, name, type, isPremium} = place;
    
    const dispatch = useAppDispatch();
    
    const handleMouseEnterEvent = (): void => {
        dispatch(setActivePlaceCardId(place));
    }

    const handleMouseLeaveEvent = (): void => {
        dispatch(setActivePlaceCardId(null));
    }

    return  <article className="cities__card place-card" onMouseEnter={handleMouseEnterEvent} onMouseLeave={handleMouseLeaveEvent}>
        {
        isPremium 
            ? <div className="place-card__mark">
                <span>Premium</span>
            </div>
            : <></>
        }
        <div className="cities__image-wrapper place-card__image-wrapper">
            <a href="#">
                <Image
                className="place-card__image"
                src={preview.url}
                width={260}
                height={200}
                alt="Place image"
                unoptimized
                />
            </a>
        </div>
        <div className="place-card__info">
            <div className="place-card__price-wrapper">
                <div className="place-card__price">
                    <b className="place-card__price-value">&euro;{price}</b>
                    <span className="place-card__price-text">&#47;&nbsp;night</span>
                </div>
                <button className="place-card__bookmark-button button" type="button">
                    <svg className="place-card__bookmark-icon" width="18" height="19">
                        <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                </button>
            </div>
            <div className="place-card__rating rating">
                <div className="place-card__stars rating__stars">
                    <span style={{width: calculateRating(rating || 0)}}></span>
                    <span className="visually-hidden">Rating</span>
                </div>
            </div>
            <h2 className="place-card__name">
                <a href="#">{name}</a>
            </h2>
            <p className="place-card__type">{type}</p>
        </div>
    </article>
}