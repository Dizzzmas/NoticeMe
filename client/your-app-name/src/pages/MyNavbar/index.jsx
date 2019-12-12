import {Button, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import React, {useContext} from "react";
import {AuthContext} from "../../services/auth";
import {Link} from "react-router-dom";
import PostModal from "../Post/post_modal";
import UserSearch from "./user_search";


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

                <Nav onSelect={selectedKey => {
                    if (selectedKey === 'logout') {
                        try {
                            fetchLogOut();
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

let fetchLogOut = () => {


    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    console.log('All must be deleted');
    return ({message: 'Logout successful'});

};