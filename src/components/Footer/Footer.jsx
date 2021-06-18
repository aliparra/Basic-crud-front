import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.css'

const Footer = () => {
    const { t } = useTranslation();
    return (
        <div className='Footer d-flex justify-content-center align-items-center'>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                     <p>{t('footer.phrase')}</p>
                    </div>
                </div>  
            </div>
        </div>
    );
};

export default function App() {
    return (
      <Suspense fallback="loading">
        <Footer />
      </Suspense>
    );
  }