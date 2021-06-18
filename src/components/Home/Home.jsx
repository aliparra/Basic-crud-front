import React, { Suspense } from 'react'
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import './Home.css'
const Home = () => {

    const { t } = useTranslation();
    
    return (
        <div className='Home'>
            <div className=' titles__wrapper d-flex flex-column justify-content-center align-items-center'>
                <h1 className='h__titles custom__tit'>{t('home.title')}</h1>
                <h6 className='h__titles custom__sub'>{t('home.subtitle')}</h6>
                <Button variant="outline-success" size="lg">
                  <Link to={`/users`} className='links__style__override green__theme'>
                  {t('home.button')}
                  </Link>
                </Button>
            </div>
        </div>
    );
};

export default function App() {
    return (
      <Suspense fallback="loading">
        <Home />
      </Suspense>
    );
  }