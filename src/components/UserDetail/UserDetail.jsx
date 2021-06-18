
import React, { useState, useEffect, Suspense } from 'react'
import { useParams } from 'react-router';
import {getUser} from '../../services/BaseService'
import { Spinner } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import BackButton from '../BackButton/BackButton';

import './UserDetail.css'


const UserDetail = () => {

    const { t } = useTranslation();
    const [user, setUser] = useState(null)
    const {user_id} = useParams()
    

    useEffect(() => {
        getUser(user_id).then(res => {
            setUser(res)
        })
    }, [user_id])

    return (
        <div className='UserDetail'>
            
            <div className="container ">
                <div className="row my-5">
                    <div className="col-12">
                        <BackButton/>
                        <h1 className="h__titles">{t('userDetail.title')}</h1> 
                    </div>
                </div>
                {user ? 
                <div className="row user__wrapper">
                    <div className="col-12 col-md-4 d-flex justify-content-center align-content-center">
                        <img src="https://res.cloudinary.com/dv4pkbmin/image/upload/v1621364313/Pruebas%20T%C3%A9cnicas/innoCV/avataaars_18_ja6ayx.png" alt="userImage" width="200"/> 
                    </div>
                    
                    <div className="col-12 col-md-4 d-flex flex-column justify-content-center align-content-center text-left">
                       <h2 className='py-2'>{user.name}</h2>
                       <p><b>{t('userDetail.id')}: </b>{user.id}</p> 
                       {<p><b>{t('userDetail.birthday')}: </b>{user.birthdate.split('T')[0].split("-").reverse().join("-")}</p>  }    
                    </div>

                    <div className="col-12 col-md-4 d-flex flex-column justify-content-center">
                    <Link className="dark__green__theme links__style__override" to={`/edit/${user.id}`}>
                        <div className="col">
                            <h3 >{t('userDetail.edit')}</h3>
                            <img src="https://res.cloudinary.com/dv4pkbmin/image/upload/v1621442096/Pruebas%20T%C3%A9cnicas/innoCV/write_q7o3mc.png" id={user.id} alt="edit" width="40px" />
                        </div>
                        
                    </Link>
                    </div>
                </div>
            :
            (<Spinner className="m-5" animation="border" role="status" variant="info">
                <span className="sr-only">Loading...</span>
            </Spinner>)
        }
        </div> 
            
        </div>
    );
};

export default function App() {
    return (
      <Suspense fallback="loading">
        <UserDetail />
      </Suspense>
    );
  }