import React, {useContext, useState} from "react";
import {Alert, Button, Modal} from "react-bootstrap";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {AuthContext} from "../../services/auth";


export default function EditModal(props) {
    const [show, setShow] = useState(false);
    const userContext = useContext(AuthContext);
    const CreateEditSchema = Yup.object().shape({
        username: Yup.string()
            .required("Cannot create empty post"),
        email: Yup.string()
            .email("Invalid email address format")
            .required("Email is required"),
    });


    const handleClose = () => {


        setShow(false)
    };
    const handleShow = () => setShow(true);

    return (
        <div onClick={(e) => {
            e.stopPropagation();
        }}>
            <Button variant="primary" onClick={handleShow}>
                Edit profile
            </Button>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <img src={userContext.currentUser.avaUrl}/>
                    <Modal.Title>Edit Profile</Modal.Title>

                </Modal.Header>
                <Modal.Body>

                    <div className="row">
                        <div className="col-lg-12">

                            <Formik
                                initialValues={{
                                    username: userContext.currentUser.username,
                                    email: userContext.currentUser.email,
                                    about_me: userContext.currentUser.aboutMe
                                }}
                                validationSchema={CreateEditSchema}
                                onSubmit={async (values, actions) => {
                                    console.log('Val: ', values);
                                    let res = await fetch(`/api/v1/users/${userContext.currentUser.id}`, {
                                        method: 'PUT',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                            "username": values.username,
                                            "handle": `@${values.username}`,
                                            "email": values.email,
                                            "about_me": values.about_me
                                        })
                                    });


                                    if (res.ok && res.status === 200) {
                                        let txt = await res.json();
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

                                        if (localStorage.getItem('currentUser')) {
                                            await localStorage.setItem('currentUser', JSON.stringify(payload.user));
                                        } else if (sessionStorage.getItem('currentUser')) {
                                            await sessionStorage.setItem('currentUser', JSON.stringify(payload.user));
                                        }

                                        userContext.handleSignIn(payload);
                                        console.log(props.history);
                                        props.history.push('/');
                                        props.history.push(`/${txt.username}`);
                                        actions.setSubmitting(false);
                                        handleClose();

                                    }
                                }
                                }
                            >
                                {({touched, errors, isSubmitting, status}) => (


                                    <Form>
                                        {status && <Alert variant='danger'>
                                            {status.message}
                                        </Alert>}
                                        <div className="form-group">

                                            <label htmlFor="comment">Username</label>
                                            <Field
                                                type="text"
                                                name="username"
                                                placeholder="Write your new username..."
                                                className={`form-control ${
                                                    touched.content && errors.content ? "is-invalid" : ""
                                                }`}
                                            />
                                            <ErrorMessage
                                                component="div"
                                                name="username"
                                                className="invalid-feedback"
                                            />
                                        </div>

                                        <div className="form-group">

                                            <label htmlFor="comment">Email</label>
                                            <Field
                                                type="email"
                                                name="email"
                                                placeholder="Write your new email..."
                                                className={`form-control ${
                                                    touched.content && errors.content ? "is-invalid" : ""
                                                }`}
                                            />
                                            <ErrorMessage
                                                component="div"
                                                name="email"
                                                className="invalid-feedback"
                                            />
                                        </div>

                                        <div className="form-group">

                                            <label htmlFor="about_me">About Me</label>
                                            <Field
                                                type="text"
                                                name="about_me"
                                                component="textarea"
                                                placeholder="Write your new bio..."
                                                className={`form-control ${
                                                    touched.content && errors.content ? "is-invalid" : ""
                                                }`}
                                            />
                                            <ErrorMessage
                                                component="div"
                                                name="about_me"
                                                className="invalid-feedback"
                                            />
                                        </div>

                                        <Modal.Footer>

                                            <Button onClick={handleClose} variant="secondary">Close</Button>

                                            <button
                                                type="submit"
                                                className="btn btn-primary btn-block"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? "Please wait..." : "Save Changes"}
                                            </button>
                                        </Modal.Footer>

                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </Modal.Body>

            </Modal>
        </div>
    );
}