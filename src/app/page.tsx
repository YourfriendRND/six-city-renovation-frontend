'use client'
import { useEffect } from 'react';
import dynamic from 'next/dynamic';

import { ShortPlaceCard, LocationItem, Sorting, Header } from '@/shared/components';
import { useAppDispatch, useAppSelector } from '@/shared/store';
import { getPlaces, getActiveCity, getCities } from '@/shared/store/slices/places/places.selectors';
import { fetchCities, fetchPlaces } from '@/shared/store/async-actions';
import { AppDispatch } from '@/shared/store';
import { getCurrentUser, getIsAuthorized } from '@/shared/store/slices/auth/auth.selectors';
import { whoAmI } from '@/shared/store/async-actions/auth/auth-async-actions';

const Map = dynamic(() => import('../shared/components/Map').then(mod => mod.Map), { ssr: false });

export default function Home() {
  const dispatch: AppDispatch = useAppDispatch();
  
  const cities = useAppSelector(getCities);

  const places = useAppSelector(getPlaces);
  const activeCity = useAppSelector(getActiveCity);
  const currentUser = useAppSelector(getCurrentUser);
  const isAuthorized = useAppSelector(getIsAuthorized);

  useEffect(() => {
    if (!currentUser && !isAuthorized) {
      dispatch(whoAmI());
    }

    if (!cities.length) {
      dispatch(fetchCities()); 
    }

    if (activeCity?.id) {
      dispatch(fetchPlaces(activeCity?.id))
    }
  }, [activeCity, cities.length, dispatch, currentUser, isAuthorized]);

  if (activeCity) {
    return (
      <><div style={{ display: "none" }}>
       <svg xmlns="http://www.w3.org/2000/svg">
         <symbol id="icon-arrow-select" viewBox="0 0 7 4">
           <path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path>
         </symbol>
         <symbol id="icon-bookmark" viewBox="0 0 17 18">
           <path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path>
         </symbol>
         <symbol id="icon-star" viewBox="0 0 13 12">
           <path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"></path>
         </symbol>
       </svg>
     </div>
     <div className="page page--gray page--main">
         <Header isAuthPage={false} />
         <main className="page__main page__main--index">
           <h1 className="visually-hidden">Cities</h1>
           <div className="tabs">
             <section className="locations container">
               <ul className="locations__list tabs__list">
                 {cities.map((city) => (
                   <LocationItem key={city.id} city={city} />
                 ))}
               </ul>
             </section>
           </div>
           <div className="cities">
             <div className="cities__places-container container">
               <section className="cities__places places">
                 <h2 className="visually-hidden">Places</h2>
                 <b className="places__found">{places.length} places to stay in {activeCity?.name}</b>
                 <Sorting />
                 <div className="cities__places-list places__list tabs__content">
                   {places.map((place) => (
                      <ShortPlaceCard key={place.id} place={place} />
                   ))}
                 </div>
               </section>
               <div className="cities__right-section">
                <Map key={activeCity.id} city={activeCity} places={places} />
               </div>
             </div>
           </div>
         </main>
       </div></>);
  } else{
    return (
      <>
        <p>Временная заглушка, нет данных</p>
      </>
    )
  }

 
}
