import React, { Suspense } from 'react'
import { useForm } from "react-hook-form";
import { Form, Button } from 'react-bootstrap';
import {createUser} from "../../services/BaseService"
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import BackButton from '../BackButton/BackButton';
import './CreateUser.css'

const CreateUser = () => {

    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { push } = useHistory();


    const onSubmit = data => {
        createUser(data)
                .then((response) => { 
                    console.log(`The user ${data.name} has been created`)
                    push("/users")
                })
                .catch((e) => console.log(e))
    };

    

    return (
        <div className='CreateUser container mt-5'>
            <BackButton/>
            <h1 className='h__titles'>{t('form.create')}</h1>
            
            <div className="row d-flex justify-content-center my-5 "> 
                <Form className="form__wrapper" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>{t('form.name')}</Form.Label>
                        <Form.Control className={errors.name && "is-invalid"} type="string" placeholder={t('form.namePlaceholder')} {...register("name", { required: true})} />
                        {errors.name && <div className="invalid-feedback">{t('form.nameError')}</div>}
                    </Form.Group>
                    
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>{t('form.birthdate')}</Form.Label>
                        <Form.Control className={errors.birthdate && "is-invalid"} type="date"  {...register("birthdate", { required: true })}/>
                        {errors.birthdate && <div className="invalid-feedback">{t('form.dateError')}</div>}
                    </Form.Group>
                    <Button variant="outline-success" type="submit">
                    {t('form.submit')}
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default function App() {
    return (
      <Suspense fallback="loading">
        <CreateUser />
      </Suspense>
    );
  }