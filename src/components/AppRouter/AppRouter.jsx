//Packages
import React from 'react'
import { Route, Switch } from 'react-router-dom'

//Views
import Home from '../Home/Home'
import UserDetail from '../UserDetail/UserDetail'
import CreateUser from '../CreateUser/CreateUser'
import EditUser from '../EditUser/EditUser'
import NotFound from '../NotFound/NotFound'
import UsersList from '../UsersList/UsersList'

const AppRouter = () => {
    return (
        <div className='AppRouter'>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/users' component={UsersList} />
                <Route exact path='/user/:user_id' component={UserDetail} />
                <Route exact path='/create' component={CreateUser} />
                <Route exact path='/edit/:user_id' component={EditUser} />
                <Route component={NotFound} />
            </Switch>
        </div>
    );
};

export default AppRouter;