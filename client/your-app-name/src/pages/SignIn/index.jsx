import React, {useContext} from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';
import {AuthContext} from "../../services/auth";
import {NavLink} from "react-router-dom";
import {GoogleLogin} from 'react-google-login';
import {Alert} from "react-bootstrap";


const SignInSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address format")
        .required("Email is required"),
    password: Yup.string()
        .min(3, "Password must be 3 characters at minimum")
        .required("Password is required")
});


export default function SignIn(props) {
    const user = useContext(AuthContext);

    let googleResponse = async (response) => {
        const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type: 'application/json'});
        const options = {
            method: 'POST',
            body: tokenBlob,
            cache: 'default'
        };
        try {
            let r = await fetch('/auth/google', options);
            console.log('r: ', r);
            const token = r.headers.get('x-auth-token');
            let google_user = await r.json();
            if (token) {
                console.log(google_user);
                let stored_user = {
                    id: google_user.id,
                    username: google_user.username,
                    email: google_user.email,
                    aboutMe: google_user.about_me,
                    role: google_user.role,
                    createdAt: google_user.createdAt,
                    updatedAt: google_user.updatedAt,
                    signed: true,
                };
                let payload = {
                    user: stored_user,
                    token: token
                };
                localStorage.setItem('currentUser', JSON.stringify(stored_user));
                localStorage.setItem('jwt', payload.token);
                user.handleSignIn(payload);
                console.log('us', JSON.stringify(stored_user));
                props.history.push({
                    pathname: `/${stored_user.username}`
                });
            }
        } catch (error) {
            console.log("Google auth failed");
            console.error(error);
        }
    };
    let onFailure = (error) => {
        // alert(error);
        console.log(error);
    };

    return (
        <React.Fragment>
            <div className="col-md-6 offset-xl-0"
                 style={{"width": "607px", "padding": "0", "paddingTop": "49px", "height": "592px"}}>
                <div>
                    <title>Login V14</title>

                    <div className="limiter">
                        <div className="slide-in-blurred-bottom">
                            <div className="wrap-login100 p-l-100 p-r-100 p-t-55 p-b-55">
                                <Formik
                                    initialValues={{email: "", password: "", remember_me: false}}
                                    validationSchema={SignInSchema}
                                    onSubmit={async (values, actions) => {
                                        console.log(values);

                                        let payload = await fetchUser(values);
                                        if (!payload) {
                                            actions.setStatus({message: 'Wrong email or password'});
                                        } else {
                                            user.handleSignIn(payload);
                                            props.history.push({
                                                pathname: `/${payload.user.username}`, state: {user: payload.user}
                                            });
                                        }


                                        actions.setSubmitting(false);

                                    }}
                                    // Here class err possible
                                    className="login100-form validate-form flex-sb flex-w">

                                    {({touched, errors, isSubmitting, status, setFieldValue}) => (

                                        <Form>
                                    <span
                                        className="login100-form-title p-b-34" id="login_text">
                         Log in
                    </span>
                                            {status && <Alert variant='danger'>
                                                {status.message}
                                            </Alert>}


                                            <span className="txt1 p-b-11">
                        Email
                    </span>
                                            <div className="wrap-input100 m-b-36" style={{"border": "0px"}}
                                                 data-validate="Email is required">


                                                <Field
                                                    type="text"
                                                    name="email"
                                                    placeholder="Email"
                                                    className={`input100`}
                                                />
                                                <ErrorMessage
                                                    component="div"
                                                    name="email"
                                                    className="wrap-input100 validate-input m-b-36"
                                                    style={{"border": "0px"}}
                                                />


                                                <span
                                                    className="focus-input100"></span></div>
                                            <span className="txt1 p-b-11">
                        Password
                    </span>
                                            <div className="wrap-input100 validate-input m-b-12"
                                                 style={{"border": "0px"}}
                                                 data-validate="Password is required"><span
                                                className="btn-show-pass"><i className="fa fa-eye"></i></span>

                                                <Field
                                                    type="password"
                                                    name="password"
                                                    placeholder="Password"
                                                    className={`input100`}
                                                />
                                                <ErrorMessage
                                                    component="div"
                                                    name="password"
                                                    className="wrap-input100 validate-input m-b-12"
                                                    style={{"border": "0px"}}
                                                />


                                                <span className="focus-input100"></span></div>
                                            <div className="flex-sb-m w-full p-b-28">
                                                <div className="contact100-form-checkbox">

                                                    <input
                                                        className="input-checkbox100" id="remember_me" type="checkbox"
                                                        name="remember_me" onChange={(e) => {
                                                        setFieldValue('remember_me', e.target.checked)
                                                    }}/><label
                                                    htmlFor="remember_me">
                                                    Remember me
                                                </label></div>
                                                {/*<div><a href="#" className="txt3">*/}
                                                {/*    Forgot Password?*/}
                                                {/*</a></div>*/}
                                            </div>
                                            <div className="container-login100-form-btn">
                                                <button className="login100-form-btn" type="submit"
                                                        disabled={isSubmitting}>
                                                    {isSubmitting ? "Please wait..." : "Login"}
                                                </button>

                                            </div>
                                            <div className="social-container">
                                                <div className="container-login100-form-btn">


                                                    <GoogleLogin
                                                        clientId="301902583432-1c95g8eich19cd94lhu0g13bbolp5n9a.apps.googleusercontent.com"
                                                        render={renderProps => (
                                                            <button onClick={renderProps.onClick}
                                                                    disabled={renderProps.disabled}

                                                                    className="login100-form-btn"
                                                                    style={{
                                                                        "background-color": "#3d5fbf",
                                                                        "marginTop": "5%"
                                                                    }}>Google </button>
                                                        )}
                                                        buttonText="Login"
                                                        onSuccess={googleResponse}
                                                        onFailure={onFailure}
                                                    />

                                                </div>
                                                {/*<a href="#" className="social"><i*/}
                                                {/*className="fab fa-google-plus-g"></i></a>*/}

                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                                <button className="text-center txt4" onClick={() => {
                                    props.handleChangeAuth();
                                }}>
                                    New around here? Click here!
                                </button>
                            </div>
                        </div>
                    </div>
                    <div id="dropDownSelect1"></div>
                </div>
            </div>
        </React.Fragment>
    );
}


let fetchUser = async (values) => {
    console.log(values.remember_me);
    let res = await fetch('/api/v1/users-sign-in', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "email": values.email,
            "password": values.password
        })

    });
    let user_and_token = await res.json();


    if (res.ok || res.status === 200) {

        let txt = user_and_token.user;
        let jwt = user_and_token.token;


        if (values.remember_me) {
            localStorage.setItem("jwt", jwt);
        } else {
            sessionStorage.setItem('jwt', jwt);
        }

        let stored_user = {
            id: txt.id,
            username: txt.username,
            email: txt.email,
            aboutMe: txt.about_me,
            role: txt.role,
            avaUrl: txt.ava_url,
            followers_count: txt.followed_by.length,
            following_count: txt.following.length,
            createdAt: txt.createdAt,
            updatedAt: txt.updatedAt,
            signed: true,
        };
        let payload = {
            user: stored_user
        };

        if (values.remember_me) {
            await localStorage.setItem('currentUser', JSON.stringify(payload.user));
        } else {
            await sessionStorage.setItem('currentUser', JSON.stringify(payload.user));
        }
        return payload;

    } else {
        console.log("Login failed");
        return undefined;
    }
};
