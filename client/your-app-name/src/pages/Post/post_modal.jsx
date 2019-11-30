import React, {useContext, useState} from "react";
import {Alert, Button, Modal} from "react-bootstrap";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {AuthContext} from "../../services/auth";


export default function PostModal(props) {
    const [show, setShow] = useState(false);
    const userContext = useContext(AuthContext);
    const CreatePostSchema = Yup.object().shape({
        content: Yup.string()
            .required("Cannot create empty post")
    });


    const handleClose = () => {


        setShow(false)
    };
    const handleShow = () => setShow(true);

    return (
        <React.Fragment>
            <Button variant="primary" onClick={handleShow}>
                Post
            </Button>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="row">
                        <div className="col-lg-12">

                            <Formik
                                initialValues={{content: ""}}
                                validationSchema={CreatePostSchema}
                                onSubmit={async (values, actions) => {
                                    console.log('Val: ', values);
                                    let res = await fetch(`/api/v1/users/${userContext.currentUser.id}/posts/new`, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                            "content": values.content
                                        })
                                    });
                                    if (res.ok && res.status === 201) {
                                      console.log(props.history);
                                        props.history.push('/');
                                        props.history.push('/posts');
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

                                            <label htmlFor="post">Post</label>
                                            <Field
                                                type="text"
                                                name="content"
                                                placeholder="Write your post..."
                                                component='textarea'
                                                className={`form-control ${
                                                    touched.content && errors.content ? "is-invalid" : ""
                                                }`}
                                            />
                                            <ErrorMessage
                                                component="div"
                                                name="post"
                                                className="invalid-feedback"
                                            />
                                        </div>

                                        <Modal.Footer>

                                            {/*<Button variant="primary" onClick={handleClose}>*/}
                                            {/*    Save Changes*/}
                                            {/*</Button>*/}
                                            <button
                                                type="submit"
                                                className="btn btn-primary btn-block"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? "Please wait..." : "Create Post"}
                                            </button>
                                        </Modal.Footer>

                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </Modal.Body>

            </Modal>
        </React.Fragment>
    );
}