import {Button, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import React from "react";


export default function MyNavBar(props) {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">NoticeMe</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/posts">Posts</Nav.Link>
                    <Nav.Link href="#users">Users</Nav.Link>
                    <Nav.Link href="#explore">Explore</Nav.Link>
                    <Nav.Link href="#about">About</Nav.Link>
                     <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                    <Button variant="outline-success">Search</Button>
                </Form>
                </Nav>
                <Nav>
                    <Nav.Link href="#register">Register</Nav.Link>
                    <Nav.Link eventKey={2} href="/signIn">
                        Login
                    </Nav.Link>
                </Nav>

            </Navbar.Collapse>
        </Navbar>
    )
}