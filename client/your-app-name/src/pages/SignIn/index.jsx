import React, {useContext} from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';
import {AuthContext} from "../../services/auth";
import {Alert} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {GoogleLogin} from 'react-google-login';
import {ChatContext} from "../../services/chat";
// import '../../assets/css/main.css'
// import '../../assets/css/Footer-Basic.css'
// import '../../assets/css/Header-Blue.css'
// import '../../assets/css/Registration-Form-with-Photo.css'
// import '../../assets/css/util.css'


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
    let chatContext = useContext(ChatContext);
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
        alert(error);
    };

    return (
        <div className="container">
            <div className="row mb-5">
                <div className="col-lg-12 text-center">
                    <h1 className="mt-5">Login Form</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">

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
                                chatContext.connectToChatkit(payload.user.username);
                                props.history.push({
                                    pathname: `/${payload.user.username}`, state: {user: payload.user}
                                });
                            }


                            actions.setSubmitting(false);

                        }}
                    >
                        {({touched, errors, isSubmitting, status}) => (

                            <div className="limiter">

                                <div className="slide-in-blurred-bottom">
                                    <div className="wrap-login100 p-l-100 p-r-100 p-t-55 p-b-55">
                                        <Form className="login100-form validate-form flex-sb flex-w">
					                    <span className="login100-form-title p-b-34" id="login_text">
						                    Login
					                        </span>

                                            <span className="txt1 p-b-11">
						                    Username
					                        </span>


                                            <div className="wrap-input100 validate-input m-b-36"
                                                 data-validate="Username is required">

                                                <Field
                                                    type="email"
                                                    name="email"
                                                    id="username"
                                                    placeholder="Enter email"
                                                    className={`input100 ${
                                                        touched.email && errors.email ? "is-invalid" : ""
                                                    }`}
                                                />
                                                <ErrorMessage
                                                     component="div"
                                                    name="email"
                                                    className="invalid-feedback text-danger"
                                                />

                                                <span className="focus-input100"></span>

                                            </div>


                                            <span className="txt1 p-b-11">
						                            Password
					                                    </span>
                                            <div className="wrap-input100 validate-input m-b-12"
                                                 data-validate="Password is required">
						                <span className="btn-show-pass" onClick="showPassword()">
							                <i className="fa fa-eye"></i>
						                </span>
                                                <Field
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                    placeholder="Enter password"
                                                    className={`input100 ${
                                                        touched.password && errors.password ? "is-invalid" : ""
                                                    }`}
                                                />
                                                <ErrorMessage
                                                    component="div"
                                                    name="password"
                                                    className="invalid-feedback"
                                                />
                                                <span className="focus-input100"></span>
                                            </div>

                                            <div className="flex-sb-m w-full p-b-28">
                                                <div className="contact100-form-checkbox">
                                                    <input className="input-checkbox100" id="ckb1" type="checkbox"
                                                           name="remember-me"/>
                                                    <label className="label-checkbox100" htmlFor="ckb1">
                                                        Remember me
                                                    </label>

                                                </div>

                                                <div>
                                                    <a href="#" className="txt3">
                                                        Forgot Password?
                                                    </a>
                                                </div>
                                            </div>

                                            <div className="container-login100-form-btn">
                                                <button className="login100-form-btn">
                                                    Login
                                                </button>

                                            </div>


                                        </Form>
                                        <button onClick="register()" className="text-center txt4">
                                            New around here? Click here!
                                        </button>
                                    </div>
                                </div>
                            </div>


                        )}
                    </Formik>
                    <p>Need an account? <NavLink to='/signUp'>Sign Up</NavLink></p>
                    <p><GoogleLogin
                        clientId="301902583432-1c95g8eich19cd94lhu0g13bbolp5n9a.apps.googleusercontent.com"
                        buttonText="Google Login"
                        onSuccess={googleResponse}
                        onFailure={onFailure}
                    /></p>
                </div>
            </div>
        </div>
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
    let txt = await res.json();
    console.log('Sign in response: ', txt);
    if (res.ok || res.status === 200) {
        let stored_user = {
            id: txt.id,
            username: txt.username,
            email: txt.email,
            aboutMe: txt.about_me,
            role: txt.role,
            avaUrl: txt.ava_url,
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
