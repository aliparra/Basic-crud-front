import React, {useEffect, useState, Suspense } from 'react';
import { useForm } from "react-hook-form";
import { Form, Button, Spinner } from 'react-bootstrap';
import {editUser, getUser} from "../../services/BaseService"
import { useHistory, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import BackButton from '../BackButton/BackButton';

const EditUser = () => {

    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { push } = useHistory();
    const {user_id} = useParams();
    const [userData, setUserData] = useState(null);

    const onSubmit = data => {
        data.id = user_id
        console.log(data)
        editUser(data)
            .then((response) => { 
                console.log(`The user ${data.name} has been edited`)
                push("/users")
            })
            .catch((e) => console.log(e))
    };

    useEffect(() => {
        console.log(user_id)
        getUser(user_id)
        .then(res => setUserData(res))
        .catch((e) => console.log(e)) 
    }, [user_id])


    
    return (
        <div className='EditUser container mt-5'>
            
            { userData ? 
            <div className="container"> 
                <BackButton/>
                <h1 className='h__titles'>{t('form.edit')} {userData.name}</h1>
                <div className="row d-flex justify-content-center my-5 boder"> 
                    <Form className="form__wrapper" onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>{t('form.name')}</Form.Label>
                            <Form.Control className={errors.name && "is-invalid"} type="string" placeholder={t('form.namePlaceholder')} defaultValue={user_id && userData.name} {...register("name", { required: true})} />
                            {errors.name && <div className="invalid-feedback">{t('form.nameError')}</div>}
                        </Form.Group>
                        
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>{t('form.birthdate')}</Form.Label>
                            <Form.Control className={errors.birthdate && "is-invalid"} type="date" defaultValue={user_id && userData.birthdate && userData.birthdate.split('T')[0].split("-").join("-")} {...register("birthdate", { required: true })}/>
                            {errors.birthdate && <div className="invalid-feedback">{t('form.dateError')}</div>}
                        </Form.Group>
                        <Button variant="outline-success" type="submit">
                        {t('form.submit')}
                        </Button>
                    </Form>
                </div>
            </div>
            :
            (<Spinner className="m-5" animation="border" role="status" variant="info">
                <span className="sr-only">Loading...</span>
            </Spinner>)
            }
        </div>
    );
};

export default function App() {
    return (
      <Suspense fallback="loading">
        <EditUser />
      </Suspense>
    );
  }