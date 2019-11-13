import React, {useContext} from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';
import {AuthContext} from "../../services/auth";
import {Alert} from "react-bootstrap";


const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address format")
        .required("Email is required"),
    password: Yup.string()
        .min(3, "Password must be 3 characters at minimum")
        .required("Password is required")
});


export default function SignIn(props) {
    const user = useContext(AuthContext);

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
                        validationSchema={LoginSchema}
                        onSubmit={async (values, actions) => {

                            await user.handleSignIn(values);
                            console.log(user.currentUser.username);
                            console.log("betrayer1", JSON.parse(localStorage.getItem('currentUser')));
                            setTimeout(function () {
                                if (!localStorage.getItem('currentUser')) {
                                    if (!sessionStorage.getItem('currentUser')) {
                                        actions.setStatus({message: 'Wrong email or password'});
                                    }
                                }

                            }, 500);
                            // if (!localStorage.getItem('currentUser')) {
                            //     if (!sessionStorage.getItem('currentUser')) {
                            //         actions.setStatus({message: 'Wrong email or password'});
                            //     }
                            // }


                            actions.setSubmitting(false);

                        }}
                    >
                        {({touched, errors, isSubmitting, status}) => (

                            <Form>
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

                                {status && <Alert variant='danger'>
                                    {status.message}
                                </Alert>}
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
                </div>
            </div>
        </div>
    );
}
