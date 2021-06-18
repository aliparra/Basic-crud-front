import React, { useState, useEffect, Suspense } from 'react';
import {getUsers, deleteUser} from '../../services/BaseService'
import {Link} from 'react-router-dom'
import { Spinner, Table, Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';


import './UsersList.css'
import BackButton from '../BackButton/BackButton';

const UsersList = () => {

    const { t } = useTranslation();
    

    const [users, setUsers] = useState(null)
    const [userId, setUserId] = useState(null);
    const [show, setShow] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sort, setSort] = useState(null);

    useEffect(() => {
        getUsers()
        .then(res => { //Fix users array. Don't use the ones who have a null name on the DB
            setUsers(res.filter((user => user.name)))
        })
        .catch(error => console.log(error))
    }, [userId]);

    //Modal config
    const handleClose = () => setShow(false)
    const handleShow = (e) => {
        setShow(true)
        setUserId(e.target.id)
    }
    
    //Manage delete
    const deleteHandler = (() => {
        console.log('Hola')
        deleteUser(userId)
        .then(res => {
            let updatedUsers = users.filter(user => user.id !== userId)
            setUsers(updatedUsers)
            setUserId(null)
            setShow(false)
        })
        .catch(e => console.log(e))  
    })


    //Filter with searchbar

    const editSearchTerm = (e) => {
        setSearchTerm( e.target.value)
      }

    const dynamicSearch = () => {
    
    return users.filter(user =>  user.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    //Sort 

    const sortByName = () => {
        setSort("byABCfirst")
        if(sort!=="byABCfirst"){
            setUsers(users.sort((a, b) => 
            {
                if(a.name < b.name) { return -1; }
                if(a.name > b.name) { return 1; }
                return 0;
            }))
        }
        else {
            setUsers(users.sort((a, b) => 
            {
                if(b.name < a.name) { return -1; }
                if(b.name > a.name) { return 1; }
                return 0;
            }))
            setSort("byXYZfirst")
        }
    }

    

    //Get users information 
    const getData = () => { 
        let usersRow = []
        dynamicSearch().map(user => {
                    if(user.name){ 
                        return usersRow.push(
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td><Link to={`/user/${user.id}`} className='links__style__override light__theme'>{user.name}</Link></td>
                            <td>{user.birthdate.split('T')[0].split("-").reverse().join("-")}</td>
                            <td>
                                <Link to={`/edit/${user.id}`}>
                                    <img src="https://res.cloudinary.com/dv4pkbmin/image/upload/v1621442096/Pruebas%20T%C3%A9cnicas/innoCV/write_q7o3mc.png" id={user.id} alt="edit" width="20px" />
                                </Link>
                            </td>
                            <td>
                                <img src="https://res.cloudinary.com/dv4pkbmin/image/upload/v1621416346/Pruebas%20T%C3%A9cnicas/innoCV/borrar_eoyvyu_isuy8o.png" className='fake__button' id={user.id} alt="delete"  onClick={handleShow} width="20px"/>
                            </td>
                        </tr>  
                    )}else{
                        return  (<Spinner className="m-5" animation="border" role="status" variant="info">
                                <span className="sr-only">Loading...</span>
                                </Spinner>)
                    }
                })
        return usersRow
    }

    
    return (
        <div className='UsersList mt-5 container'>
            {/* Delete modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="h__titles">{t('list.modals.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{t('list.modals.body')}</Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleClose}>
                    {t('list.modals.close')}
                    </Button>
                    <Button variant="danger" onClick={deleteHandler}>
                    {t('list.modals.delete')}
                    </Button>
                </Modal.Footer>
            </Modal>


            <div className='my-5 row'>
                <div className="col-12">
                    <BackButton/>
                    <h1 className="h__titles">{t('list.title')}</h1>
                </div>
                <div className="col-12">
                    <input className='my-5 form-control input-lg' type= 'text' value ={searchTerm} onChange = {editSearchTerm } placeholder = {t('list.placeholder')} autoComplete="on"/>
                </div>
            </div>
            <div>
            {
                
                users ?
                 
                (<Table size="sm" className="table__style" bordered hover >
                <thead>
                    <tr className='table__head'>
                        <th>{t('list.tableHead.id')}</th>
                        <th>{t('list.tableHead.name')} <button className="custom__button__style" onClick={sortByName}><img src="https://res.cloudinary.com/dv4pkbmin/image/upload/v1621426166/Pruebas%20T%C3%A9cnicas/innoCV/sort-arrows-couple-pointing-up-and-down_tg8wxc.png" alt='sortIcon' height="15"/></button> </th>
                        <th>{t('list.tableHead.birthday')}</th>
                        <th>{t('list.tableHead.edit')}</th>
                        <th>{t('list.tableHead.delete')}</th>
                    </tr>
                </thead>
                <tbody>
                    {getData()}
                    {dynamicSearch().length === 0 && <h3>{t('list.notUsers')}</h3>}
                </tbody>
            </Table>)
            :
            (<Spinner className="m-5" animation="border" role="status" variant="info">
                <span className="sr-only">Loading...</span>
            </Spinner>)
            }
            </div>

            <Link to={'/create'} className='links__style__override dark__theme'><Button variant="outline-success">{t('list.addButton')}</Button></Link>
        </div>
    );
};

export default function App() {
    return (
      <Suspense fallback="loading">
        <UsersList />
      </Suspense>
    );
  }