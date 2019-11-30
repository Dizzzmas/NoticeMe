import React, {useContext, useState} from "react";
import {Alert, Button, Modal} from "react-bootstrap";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {AuthContext} from "../../services/auth";


export default function CommentModal(props) {
    const [show, setShow] = useState(false);
    const userContext = useContext(AuthContext);
    const CreateCommentSchema = Yup.object().shape({
        content: Yup.string()
            .required("Cannot create empty post")
    });


    const handleClose = () => {


        setShow(false)
    };
    const handleShow = () => setShow(true);

    return (
        <div onClick={(e) => {
            e.stopPropagation();}}>
            <Button variant="primary" onClick={handleShow}>
                Leave Comment
            </Button>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Leave Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="row">
                        <div className="col-lg-12">

                            <Formik
                                initialValues={{content: ""}}
                                validationSchema={CreateCommentSchema}
                                onSubmit={async (values, actions) => {
                                    console.log('Val: ', values);
                                    let res = await fetch(`/api/v1/users/${userContext.currentUser.id}/posts/${props.post_id}/comments`, {
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
                                      props.history.push(`/${props.post_author}/posts/${props.post_id}`)
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

                                            <label htmlFor="comment">Comment</label>
                                            <Field
                                                type="text"
                                                name="content"
                                                placeholder="Write your comment..."
                                                component='textarea'
                                                className={`form-control ${
                                                    touched.content && errors.content ? "is-invalid" : ""
                                                }`}
                                            />
                                            <ErrorMessage
                                                component="div"
                                                name="comment"
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
                                                {isSubmitting ? "Please wait..." : "Leave Comment"}
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