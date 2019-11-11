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
    const signed = user.currentUser.signed;
    if (isPrivate && !signed) {
        return <Redirect to='/signIn'/>;
    }
    if (!isPrivate && signed) {
        return <Redirect to='/posts'/>;
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
