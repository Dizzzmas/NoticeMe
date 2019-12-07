import {Button, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import React, {useContext} from "react";
import {AuthContext} from "../services/auth";
import NavLink from "react-bootstrap/NavLink";
import {Link} from "react-router-dom";
import PostModal from "../pages/Post/post_modal";
import UserSearch from "./users_search";




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
                        <Nav.Link href="#users">Users</Nav.Link> : ''
                    }
                    <Nav.Link href="#explore">Explore</Nav.Link>
                    <Nav.Link href="#about">About</Nav.Link>
                    <Nav.Link href="/chat">Chat</Nav.Link>

                    <UserSearch history={props.history}/>
                    <PostModal history={props.history}/>
                </Nav>

                <Nav onSelect={async selectedKey => {
                    if (selectedKey === 'logout') {
                        try {
                            let res = await fetchLogOut();
                            user.handleLogOut();
                        } catch (error) {
                            console.log("AAAAA", error);
                        }
                    }
                }}>
                    {user.currentUser.signed ?
                        <React.Fragment>
                            <Nav.Link eventKey='logout' href="/signIn">
                                LogOut
                            </Nav.Link>
                            <Link
                                to={{pathname: `/${user.currentUser.username}`, user: user.currentUser}}>Profile</Link>
                        </React.Fragment>
                        : <Nav.Link href="/signIn">LogIn</Nav.Link>}
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