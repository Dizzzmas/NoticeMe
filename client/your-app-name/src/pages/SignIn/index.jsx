import React from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';


const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address format")
        .required("Email is required"),
    password: Yup.string()
        .min(3, "Password must be 3 characters at minimum")
        .required("Password is required")
});


export default function SignIn() {
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
                        initialValues={{email: "", password: ""}}
                        validationSchema={LoginSchema}
                        onSubmit={(values, {setSubmitting}) => {
                            // alert("Submitting"); // Submit to server here
                            fetch('api/v1/users-sign-in', {
                                method: 'POST',
                                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                                body: {
                                    "email": values.email,
                                    "password": values.password
                                }

                            }).then(res => {
                                alert(res);
                                console.log(res);
                            })
                                .catch(error => {
                                    console.log(error);
                                    alert(error)
                                });
                            setSubmitting(false);
                        }}
                    >
                        {({touched, errors, isSubmitting}) => (
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
