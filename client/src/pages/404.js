import React, {Component} from 'react'
import {Link} from 'react-router-dom'

const NotFound = () => (
    <div>
        <strong>404 Page Not Found</strong>
        <p>Sorry for inconvenience, the administrator has been notified</p><br/>
        <Link to='/'>Return to Home Page</Link>
    </div>
);

export default NotFound;