import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {AuthContext} from "../services/auth";


export default function RouteWrapper({
                                         component: Component,
                                         isPrivate,
                                         ...rest
                                     }) {
    const user = useContext(AuthContext);
    let signed = user.currentUser.signed;

    console.log("RouterWrapper changed: ", isPrivate, signed);
    if (isPrivate && !signed) {
        return <Redirect to='/'/>;
    }

    if (rest.path) {
        if (signed && (rest.path.toString() === '/')) {
            return <Redirect to={`/${user.currentUser.username}`}/>;
        }
    }


    return <Route {...rest} component={Component}/>;

}

RouteWrapper.propTypes = {
    isPrivate: PropTypes.bool,
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
};

RouteWrapper.defaultProps = {
    isPrivate: false
};
