import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';


export default function RouteWrapper({
                                         component: Component,
                                         isPrivate,
                                         ...rest
                                     }) {
    const signed = true;
    if (isPrivate && !signed) {
        return <Redirect to='/'/>;
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
  isPrivate: true
};
