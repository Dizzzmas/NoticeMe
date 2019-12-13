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
        <React.Fragment>
            <div className="col-md-6 offset-xl-0"
                 style={{"width": "607px", "padding": "0", "paddingTop": "49px", "height": "592px"}}>
                <div>
                    <title>Login V14</title>

                    <div className="limiter">
                        <div className="slide-in-blurred-bottom">
                            <div className="wrap-login100 p-l-100 p-r-100 p-t-55 p-b-55">
                                <Formik
                                    initialValues={{username: "", email: "", password: "", confirm_password: ""}}
                                    validationSchema={SignUpSchema}
                                    onSubmit={async (values, actions) => {
                                        console.log(values);
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
                                    }
                                    }
                                    // Here class err possible
                                    className="login100-form validate-form flex-sb flex-w">

                                    {({touched, errors, isSubmitting, status, setFieldValue}) => (

                                        <Form>

                                            <span
                                                className="login100-form-title p-b-34" id="login_text">
                         Sign Up
                    </span>
                                            {status && <Alert variant='danger'>
                                                {status.message}
                                            </Alert>}
                                            <div className="social-container"><a href="#" className="social"><i
                                                className="fab fa-google-plus-g"></i></a></div>
                                            <span className="txt1 p-b-11">
                       Username
                    </span>
                                            <div className="wrap-input100 m-b-36" style={{"border": "0px"}}
                                                 data-validate="Username is required">


                                                <Field
                                                    type="text"
                                                    name="username"
                                                    placeholder="Username"
                                                    className={`input100`}
                                                />
                                                <ErrorMessage
                                                    component="div"
                                                    name="username"
                                                    className="wrap-input100 validate-input m-b-36"
                                                    style={{"border": "0px"}}
                                                />


                                                <span
                                                    className="focus-input100"></span></div>

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
                                            <div className="wrap-input100 m-b-36" style={{"border": "0px"}}
                                                 data-validate="Password is required">


                                                <Field
                                                    type="password"
                                                    name="password"
                                                    placeholder="Password"
                                                    className={`input100`}
                                                />
                                                <ErrorMessage
                                                    component="div"
                                                    name="password"
                                                    className="wrap-input100 validate-input m-b-36"
                                                    style={{"border": "0px"}}
                                                />


                                                <span
                                                    className="focus-input100"></span></div>

                                            <span className="txt1 p-b-11">
                        Confirm Password
                    </span>
                                            <div className="wrap-input100 m-b-36" style={{"border": "0px"}}
                                                 data-validate="Must confirm password">


                                                <Field
                                                    type="password"
                                                    name="confirm_password"
                                                    placeholder="Confirm Password"
                                                    className={`input100`}
                                                />
                                                <ErrorMessage
                                                    component="div"
                                                    name="confirm_password"
                                                    className="wrap-input100 validate-input m-b-36"
                                                    style={{"border": "0px"}}
                                                />


                                                <span
                                                    className="focus-input100"></span></div>
                                            <div className="flex-sb-m w-full p-b-28">
                                                <div className="contact100-form-checkbox">

                                                </div>
                                            </div>

                                            <div className="container-login100-form-btn">
                                                <button className="login100-form-btn" type="submit"
                                                        style={{"marginLeft": "18%"}}
                                                        disabled={isSubmitting}>
                                                    {isSubmitting ? "Please wait..." : "Sign Up"}
                                                </button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                                <button className="text-center txt4" style={{"marginLeft": "-11%"}} onClick={() => {
                                    props.handleChangeAuth();
                                }}>
                                    Already have an account? Click here!
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

//
// export default function SignUp(props) {
//     const user = useContext(AuthContext);
//     return (
//         <div className="container">
//             <div className="row mb-5">
//                 <div className="col-lg-12 text-center">
//                     <h1 className="mt-5">Register Form</h1>
//                 </div>
//             </div>
//             <div className="row">
//                 <div className="col-lg-12">
//                     <Formik
//                         initialValues={{username: "", email: "", password: "", confirm_password: ""}}
//                         validationSchema={SignUpSchema}
//                         onSubmit={async (values, actions) => {
//                             try {
//                                 let payload = await fetchSignUp(values);
//                                 if (!payload) {
//                                     actions.setStatus({message: 'Wrong email or password'});
//                                 } else {
//                                     user.handleSignIn(payload);
//                                     props.history.push({
//                                         pathname: `/signIn/follow`, state: {user: payload.user}
//                                     });
//                                 }
//
//                                 // props.history.push('/signIn');
//                             } catch (error) {
//                                 actions.setStatus({message: error.message});
//                             }
//                             actions.setSubmitting(false);
//                         }}
//                     >
//                         {({touched, errors, isSubmitting, status}) => (
//
//
//                             <Form>
//                                 <div className="form-group">
//                                     {status && <Alert variant='danger'>
//                                         {status.message}
//                                     </Alert>}
//                                     <label htmlFor="username">Username</label>
//                                     <Field
//                                         type="text"
//                                         name="username"
//                                         placeholder="Enter username"
//                                         className={`form-control ${
//                                             touched.username && errors.username ? "is-invalid" : ""
//                                         }`}
//                                     />
//                                     <ErrorMessage
//                                         component="div"
//                                         name="username"
//                                         className="invalid-feedback"
//                                     />
//                                 </div>
//                                 <div className="form-group">
//
//                                     <label htmlFor="email">Email</label>
//                                     <Field
//                                         type="email"
//                                         name="email"
//                                         placeholder="Enter email"
//                                         className={`form-control ${
//                                             touched.email && errors.email ? "is-invalid" : ""
//                                         }`}
//                                     />
//                                     <ErrorMessage
//                                         component="div"
//                                         name="email"
//                                         className="invalid-feedback"
//                                     />
//                                 </div>
//
//
//                                 <div className="form-group">
//                                     <label htmlFor="password">Password</label>
//                                     <Field
//                                         type="password"
//                                         name="password"
//                                         placeholder="Enter password"
//                                         className={`form-control ${
//                                             touched.password && errors.password ? "is-invalid" : ""
//                                         }`}
//                                     />
//                                     <ErrorMessage
//                                         component="div"
//                                         name="password"
//                                         className="invalid-feedback"
//                                     />
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="confirm_password">Confirm Password</label>
//                                     <Field
//                                         type="password"
//                                         name="confirm_password"
//                                         placeholder="Confirm password"
//                                         className={`form-control ${
//                                             touched.confirm_password && errors.confirm_password ? "is-invalid" : ""
//                                         }`}
//                                     />
//                                     <ErrorMessage
//                                         component="div"
//                                         name="confirm_password"
//                                         className="invalid-feedback"
//                                     />
//                                 </div>
//
//                                 <button
//                                     type="submit"
//                                     className="btn btn-primary btn-block"
//                                     disabled={isSubmitting}
//                                 >
//                                     {isSubmitting ? "Please wait..." : "Submit"}
//                                 </button>
//                             </Form>
//                         )}
//                     </Formik>
//                     <p>Already have an account? <NavLink to='/signIn'>Sign in</NavLink></p>
//                 </div>
//             </div>
//         </div>
//     );
// }


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


        if (res.ok) {
            let txt = user_and_token.final_user;
            let jwt = user_and_token.token;
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
            throw new Error(user_and_token.message.toString());
        }

    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};
