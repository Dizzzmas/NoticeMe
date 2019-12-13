import {Button, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../services/auth";
import {Link} from "react-router-dom";
import PostModal from "../Post/post_modal";
import UserSearch from "./user_search";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import '../../assets/css/styles.min.css'


export default function MyNavBar(props) {
    const user = useContext(AuthContext);
    const [signUp, setSignUp] = useState(false);

    let handleChangeAuth = () => {
        setSignUp(!signUp)
    };


    return (
        <div className='who-to-follow'>
        <div className="pulse animated"
             style={{backgroundColor: "#ffffff"}}>
            <div className="align-items-center header-blue"
                 style={{
                     "padding": "24px",
                     "margin": "0px",
                     "height": "100vh",
                     "fontFamily": "Montserrat, sans-serif",
                     "fontWeight": "bold",
                     "filter": "blur(0px)",
                     "width": "100vw"
                 }}>
                <nav className="navbar navbar-light navbar-expand-md navigation-clean-search">
                    <div className="container-fluid"><a className="navbar-brand" href="#">NoticeMe</a>
                        <button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1"><span
                            className="sr-only">Toggle navigation</span><span
                            className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse"
                             id="navcol-1">
                            <ul className="nav navbar-nav">
                                <li className="nav-item" role="presentation"><a className="nav-link"
                                                                                href="#">Link</a>
                                </li>
                                <li className="nav-item dropdown"><a className="dropdown-toggle nav-link"
                                                                     data-toggle="dropdown" aria-expanded="false"
                                                                     href="#">Dropdown </a>
                                    <div className="dropdown-menu" role="menu"><a className="dropdown-item"
                                                                                  role="presentation" href="#">First
                                        Item</a><a className="dropdown-item" role="presentation" href="#">Second
                                        Item</a><a className="dropdown-item" role="presentation" href="#">Third
                                        Item</a>
                                    </div>
                                </li>
                            </ul>
                            <form className="form-inline mr-auto" target="_self">
                                <div className="form-group"><label htmlFor="search-field"><i
                                    className="fa fa-search"></i></label><input
                                    className="form-control search-field"
                                    type="search" id="search-field"
                                    name="search"></input></div>
                            </form>
                            <span className="navbar-text"> <a className="login" href="#" style={{"width": "auto"}}>Log In</a></span><a
                            className="btn btn-light action-button" role="button" href="#">Sign Up</a></div>
                    </div>
                </nav>

                <div className="container" style={{"height": "70vh", "width": "100vw"}}>

                    <div className="row" style={{"width": "79vw"}}>

                        <div className="col-md-6 d-xl-flex align-items-xl-center"
                             style={{"height": "80vh", "width": "95vw"}}>

                            <h1 className="display-2" data-aos="fade-up"
                                style={{
                                    "color": "rgb(255,255,255)",
                                    "fontWeight": "700",
                                    "fontFamily": "Montserrat, sans-serif",
                                    "fontSize": "64px",
                                    "width": "340px"
                                }}>NoticeMe, <br/><span
                                className="d-inline-block txt-rotate"
                                style={{
                                    fontFamily: "Montserrat, sans-serif",
                                    fontWeight: "normal",
                                    fontStyle: "normal"
                                }}
                                data-period="2000"
                                data-rotate="[ &quot;cbt.&quot;, &quot;daddy.&quot;, &quot;cumslut.&quot;, &quot;cocksucker.&quot;, &quot;gay furry porn!&quot; ]">senpai.</span><br/>
                            </h1>
                            <p
                                className="lead text-right text-white-50 d-block float-right flex-column-reverse flex-grow-1 flex-shrink-1 align-items-baseline justify-content-xl-end align-items-xl-end"
                                id="fade-in"
                                style={{
                                    "color": "rgb(215,215,215)",
                                    "fontSize": "16px",
                                    "paddingTop": "268px",
                                    "paddingRight": "-29px",
                                    "paddingBottom": "0",
                                    "height": "136px",
                                    "margin": "6px",
                                    "width": "417px"
                                }}>"NoticeMe"
                                is a revolutionary platform for connecting users, sharing pictures, videos, etc. We
                                let
                                you share literally everything with the world, so go ahead, and let 'em know what
                                you're
                                up to! No, of course we're not just some
                                Twitter copycat, we're different.</p>
                        </div>
                        {signUp ? <SignUp history={props.history} handleChangeAuth={handleChangeAuth}/> :
                            <SignIn history={props.history} handleChangeAuth={handleChangeAuth}/>}

                    </div>
                </div>
            </div>
        </div>
            </div>
    )
}
// export default function MyNavBar(props) {
//     const user = useContext(AuthContext);
//
//     return (
//         <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
//             <Navbar.Brand href="#home">NoticeMe</Navbar.Brand>
//             <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
//             <Navbar.Collapse id="responsive-navbar-nav">
//                 <Nav className="mr-auto">
//                     <Nav.Link href="/">Home</Nav.Link>
//                     <Nav.Link href="/posts">Posts</Nav.Link>
//                     {user.currentUser.role ?
//                         <Nav.Link href="#users">Users</Nav.Link> : ''
//                     }
//                     <Nav.Link href="#explore">Explore</Nav.Link>
//                     <Nav.Link href="#about">About</Nav.Link>
//                     <Nav.Link href="/chat">Chat</Nav.Link>
//
//                     <UserSearch history={props.history}/>
//                     <PostModal history={props.history}/>
//                 </Nav>
//
//                 <Nav onSelect={selectedKey => {
//                     if (selectedKey === 'logout') {
//                         try {
//                             fetchLogOut();
//                             user.handleLogOut();
//                         } catch (error) {
//                             console.log("AAAAA", error);
//                         }
//                     }
//                 }}>
//                     {user.currentUser.signed ?
//                         <React.Fragment>
//                             <Nav.Link eventKey='logout' href="/signIn">
//                                 LogOut
//                             </Nav.Link>
//                             <Link
//                                 to={{pathname: `/${user.currentUser.username}`, user: user.currentUser}}>Profile</Link>
//                         </React.Fragment>
//                         : <Nav.Link href="/signIn">LogIn</Nav.Link>}
//                 </Nav>
//                 <p><b>{user.currentUser.username}</b></p>
//             </Navbar.Collapse>
//             <div><p><b></b></p></div>
//         </Navbar>
//
//     )
// }

let fetchLogOut = () => {


    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    console.log('All must be deleted');
    return ({message: 'Logout successful'});

};