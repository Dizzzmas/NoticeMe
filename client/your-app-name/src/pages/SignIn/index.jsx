import React, {useContext} from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';
import {AuthContext} from "../../services/auth";
import {Alert} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {GoogleLogin} from 'react-google-login';


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
                    aboutMe: google_user.aboutMe,
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
                props.history.push('/profile');
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
                            let payload = await fetchUser(values);
                            if (!payload) {
                                actions.setStatus({message: 'Wrong email or password'});
                            } else {
                                user.handleSignIn(payload);
                                props.history.push('/profile');
                            }


                            actions.setSubmitting(false);

                        }}
                    >
                        {({touched, errors, isSubmitting, status}) => (


                            <Form>
                                {status && <Alert variant='danger'>
                                    {status.message}
                                </Alert>}
                                <div className="form-group">

                                    <label htmlFor="email">Email</label>
                                    <Field
                                        type="email"
                                        name="email"
                                        placeholder="Enter email"
                                        className={`form-control ${
                                            touched.email && errors.email ? "is-invalid" : ""
                                        }`}
                                    />
                                    <ErrorMessage
                                        component="div"
                                        name="email"
                                        className="invalid-feedback"
                                    />
                                </div>


                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Field
                                        type="password"
                                        name="password"
                                        placeholder="Enter password"
                                        className={`form-control ${
                                            touched.password && errors.password ? "is-invalid" : ""
                                        }`}
                                    />
                                    <ErrorMessage
                                        component="div"
                                        name="password"
                                        className="invalid-feedback"
                                    />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='checkbox'>Remember me?</label>
                                    <Field type="checkbox" name="remember_me"/>
                                </div>


                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Please wait..." : "Submit"}
                                </button>
                            </Form>
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
            aboutMe: txt.aboutMe,
            role: txt.role,
            avaUrl: txt.avaUrl,
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
