import React from 'react';
import { Route, Redirect } from 'react-router-dom'; 

const PrivateRoute = ({ component: Component, setBackDrop: setBackDrop, ...rest }) => {
    let isLoggedIn = sessionStorage.getItem('isLoggedIn');
    sessionStorage.setItem('title', !rest.title ? 'Dashboard' : rest.title);
    return (
        <Route {...rest} render={props => (
            isLoggedIn ?
                <Component {...props} setBackDrop={setBackDrop} />
                : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;