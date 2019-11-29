import {Button, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import React, {useContext} from "react";
import {AuthContext} from "../services/auth";
import NavLink from "react-bootstrap/NavLink";
import {Link} from "react-router-dom";


export default function MyNavBar(props) {
    const user = useContext(AuthContext);
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">NoticeMe</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/posts">Posts</Nav.Link>
                    {user.currentUser.role ?
                    <Nav.Link href="#users">Users</Nav.Link>: ''
                    }
                    <Nav.Link href="#explore">Explore</Nav.Link>
                    <Nav.Link href="#about">About</Nav.Link>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Nav>

                <Nav onSelect={async selectedKey => {
                    if (selectedKey === 'logout') {
                        try {
                            let res = await fetchLogOut();
                            user.handleLogOut();
                             // props.history.push('/signIn');
                        } catch (error) {
                            console.log("AAAAA", error);
                            // return <Redirect to='/'/>;
                        }
                    }
                }}>
                    {user.currentUser.signed ?
                        <Nav.Link eventKey='logout' href="/signIn">
                            LogOut
                        </Nav.Link>
                        : <Nav.Link href="/signIn">LogIn</Nav.Link>}
                    <Link to={{ pathname: `/${user.currentUser.username}`, user: user.currentUser }}>Profile</Link>
                </Nav>
                <p><b>{user.currentUser.username}</b></p>
            </Navbar.Collapse>
            <div><p><b></b></p></div>
        </Navbar>

    )
}

let fetchLogOut = async () => {
    try {
        let res = await fetch('/api/v1/users-log-out', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        let txt = await res.json();
        console.log('Txt: ', txt);
        if (!sessionStorage.getItem('currentUser')) {
            await localStorage.removeItem('currentUser');
        } else {
            await sessionStorage.removeItem('currentUser');
        }
        console.log('All must be deleted');
        return ({message: 'Logout successful'});

    } catch (error) {
        console.log("Err", error);
        if (!sessionStorage.getItem('currentUser')) {
            await localStorage.removeItem('currentUser');
        } else {
            await sessionStorage.removeItem('currentUser');
        }
        return ({message: 'Logut failed'});
    }
};