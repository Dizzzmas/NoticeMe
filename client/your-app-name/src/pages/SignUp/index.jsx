import React, {useContext} from "react";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {NavLink} from "react-router-dom";
import {Alert} from "react-bootstrap";
import axios from "axios";
import {AuthContext} from "../../services/auth";


const SignUpSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, 'Username too short!')
        .max(20, 'Username too long!')
        .required('Username required!'),
    email: Yup.string()
        .email("Invalid email address format")
        .required("Email is required"),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .matches(/[a-z]/, 'Password must contain at least one lowercase char')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase char')
        .matches(/[a-zA-Z]+[^a-zA-Z\s]+/, 'Password must contain at least 1 number or special char (@,!,#, etc).')
        .required("Password is required"),
    confirm_password: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
});


export default function SignUp(props) {
    const user = useContext(AuthContext);
    return (
        <div className="container">
            <div className="row mb-5">
                <div className="col-lg-12 text-center">
                    <h1 className="mt-5">Register Form</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <Formik
                        initialValues={{username: "", email: "", password: "", confirm_password: ""}}
                        validationSchema={SignUpSchema}
                        onSubmit={async (values, actions) => {
                            try {
                                let payload = await fetchSignUp(values);
                                if (!payload) {
                                    actions.setStatus({message: 'Wrong email or password'});
                                } else {
                                    user.handleSignIn(payload);
                                    props.history.push({
                                        pathname: `/signIn/follow`, state: {user: payload.user}
                                    });
                                }

                                // props.history.push('/signIn');
                            } catch (error) {
                                actions.setStatus({message: error.message});
                            }
                            actions.setSubmitting(false);
                        }}
                    >
                        {({touched, errors, isSubmitting, status}) => (


                            <Form>
                                <div className="form-group">
                                    {status && <Alert variant='danger'>
                                        {status.message}
                                    </Alert>}
                                    <label htmlFor="username">Username</label>
                                    <Field
                                        type="text"
                                        name="username"
                                        placeholder="Enter username"
                                        className={`form-control ${
                                            touched.username && errors.username ? "is-invalid" : ""
                                        }`}
                                    />
                                    <ErrorMessage
                                        component="div"
                                        name="username"
                                        className="invalid-feedback"
                                    />
                                </div>
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
                                <div className="form-group">
                                    <label htmlFor="confirm_password">Confirm Password</label>
                                    <Field
                                        type="password"
                                        name="confirm_password"
                                        placeholder="Confirm password"
                                        className={`form-control ${
                                            touched.confirm_password && errors.confirm_password ? "is-invalid" : ""
                                        }`}
                                    />
                                    <ErrorMessage
                                        component="div"
                                        name="confirm_password"
                                        className="invalid-feedback"
                                    />
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
                    <p>Already have an account? <NavLink to='/signIn'>Sign in</NavLink></p>
                </div>
            </div>
        </div>
    );
}


let fetchSignUp = async (values) => {
    try {
        console.log(values);
        let res = await fetch('/api/v1/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": values.username,
                "password": values.password,
                "email": values.email,
            })
        });

        let user_and_token = await res.json();
        let txt = user_and_token.final_user;
        let jwt = user_and_token.token;


        if (res.ok) {
            console.log('SignUp successful');
            localStorage.setItem("jwt", jwt);

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
            localStorage.setItem('currentUser', JSON.stringify(payload.user));


            await axios
                .post('/api/v1/chatkit/users', {userId: txt.id, userName: txt.username});



            return payload;
            // ASDDDDDDDddasddasasddasdas


            //fkldsklfdlkfd

        } else {
            throw new Error(txt.message.toString());
        }

    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};
