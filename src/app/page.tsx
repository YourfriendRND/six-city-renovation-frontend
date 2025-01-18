'use client'
import Image from 'next/image';
import { useState } from 'react';

import { PlaceCard, LocationItem, Navigation, Sorting } from '../shared/components';
import  { cities, cards } from '../mocks'; 
import { User } from '@/shared/types/user.type';

export default function Home() {

 const [activeCity, setActiveCity] = useState(cities[0]);

 const [user] = useState<User | null>(null); // Проверка на авторизацию

 return <body>
    <div style={{ display: "none" }} >
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
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
          <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <Image
                  src="img/logo.svg"
                  className="header__logo"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </a>
            </div>
            <Navigation email={user?.email} favoriteCount={user?.favoriteCount} isAuth={Boolean(user)} />
          </div>
        </div>
      </header>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {cities.map((city) => (
                <LocationItem key={city} name={city} isActive={activeCity === city} setActive={setActiveCity} />
              ))}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{cards.length} places to stay in {activeCity}</b>
              <Sorting />
              <div className="cities__places-list places__list tabs__content">
                {cards.map((card) => (
                  <PlaceCard key={card.id} 
                    imgSrc={card.imgSrc}
                    name={card.name}
                    price={card.price}
                    rating={card.rating}
                    type={card.type}
                    isPremium={card.isPremium}
                  />
                ))}

              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map"></section>
            </div>
          </div>
        </div>
      </main>
    </div>
 </body>;
}
