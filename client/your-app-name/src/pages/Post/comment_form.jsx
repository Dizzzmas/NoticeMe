import React, {useContext, useState} from "react";
import {Alert, Button, Modal} from "react-bootstrap";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {AuthContext} from "../../services/auth";


export default function CommentForm(props) {
    const userContext = useContext(AuthContext);
    const CreateCommentSchema = Yup.object().shape({
        content: Yup.string()
            .required("Cannot create empty post")
    });


    return (
        <Formik
            initialValues={{content: ""}}
            validationSchema={CreateCommentSchema}
            onSubmit={async (values, actions) => {
                const jwt = userContext.getJwt();
                let res = await fetch(`/api/v1/users/${userContext.currentUser.id}/posts/${props.post_id}/comments`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',

                        Authorization: `Bearer ${jwt}`,

                    },
                    body: JSON.stringify({
                        "content": values.content
                    })
                });
                let new_comment = await res.json();
                if (res.ok && res.status === 201) {
                    console.log(props.history);
                    let new_posts = props.posts;
                    for (let i = 0; i < new_posts.length; i++) {

                        if (new_posts[i].id == props.post_id) {
                            new_posts[i].comments.push(new_comment);
                            new_posts[i].commentsCount = parseInt(new_posts[i].commentsCount) + 1;
                            break;
                        }

                    }
                    props.handlePostsUpdate(new_posts);
                    actions.setSubmitting(false);
                }
            }
            }
        >
            {({touched, errors, isSubmitting, status}) => (
                <Form className="comment-form inline-items">
                    <div className="post__author author vcard inline-items">
                        <img src={userContext.currentUser.avaUrl} alt="author"/>

                        <div className="form-group with-icon-right is-empty">

                            <Field
                                type="text"
                                name="content"
                                placeholder="Write your comment..."
                                component='textarea'
                                className="form-control"
                            />

                            <div className="add-options-message">
                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                   className="options-message" data-toggle="modal"
                                   data-target="#update-header-photo">
                                    <svg className="olymp-camera-icon">
                                        <use xlinkHref="assets/img/./icons.svg#olymp-camera-icon"></use>
                                    </svg>
                                </a>
                            </div>

                            <span className="material-input"></span></div>
                    </div>


                    <button style={{"letterSpacing": "0",

"padding": "10px",

"backgroundColor": "#3d5fbf",

"border": "1px solid #3d5fbf"}}
                        type="submit"
                        className="btn btn-md-2 btn-primary"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Please wait..." : "Leave Comment"}
                    </button>


                </Form>
            )}
        </Formik>

    )
    // );return (
    //     <div onClick={(e) => {
    //         e.stopPropagation();}}>
    //         <Button variant="primary" onClick={handleShow}>
    //             Leave Comment
    //         </Button>
    //
    //         <Modal show={show} onHide={handleClose} animation={false}>
    //             <Modal.Header closeButton>
    //                 <Modal.Title>Leave Comment</Modal.Title>
    //             </Modal.Header>
    //             <Modal.Body>
    //
    //                 <div className="row">
    //                     <div className="col-lg-12">
    //
    //                         <Formik
    //                             initialValues={{content: ""}}
    //                             validationSchema={CreateCommentSchema}
    //                             onSubmit={async (values, actions) => {
    //                                 console.log('Val: ', values);
    //                                 const jwt = userContext.getJwt();
    //                                 let res = await fetch(`/api/v1/users/${userContext.currentUser.id}/posts/${props.post_id}/comments`, {
    //                                     method: 'POST',
    //                                     headers: {
    //                                         'Content-Type': 'application/json',
    //
    //                                         Authorization: `Bearer ${jwt}`,
    //
    //                                     },
    //                                     body: JSON.stringify({
    //                                         "content": values.content
    //                                     })
    //                                 });
    //                                 if (res.ok && res.status === 201) {
    //                                   console.log(props.history);
    //                                   props.history.push('/');
    //                                   props.history.push(`/${props.post_author}/posts/${props.post_id}`)
    //                                     actions.setSubmitting(false);
    //                                     handleClose();
    //
    //                                 }
    //                             }
    //                             }
    //                         >
    //                             {({touched, errors, isSubmitting, status}) => (
    //
    //
    //                                 <Form>
    //                                     {status && <Alert variant='danger'>
    //                                         {status.message}
    //                                     </Alert>}
    //                                     <div className="form-group">
    //
    //                                         <label htmlFor="comment">Comment</label>
    //                                         <Field
    //                                             type="text"
    //                                             name="content"
    //                                             placeholder="Write your comment..."
    //                                             component='textarea'
    //                                             className={`form-control ${
    //                                                 touched.content && errors.content ? "is-invalid" : ""
    //                                             }`}
    //                                         />
    //                                         <ErrorMessage
    //                                             component="div"
    //                                             name="comment"
    //                                             className="invalid-feedback"
    //                                         />
    //                                     </div>
    //
    //                                     <Modal.Footer>
    //
    //                                         {/*<Button variant="primary" onClick={handleClose}>*/}
    //                                         {/*    Save Changes*/}
    //                                         {/*</Button>*/}
    //                                         <button
    //                                             type="submit"
    //                                             className="btn btn-primary btn-block"
    //                                             disabled={isSubmitting}
    //                                         >
    //                                             {isSubmitting ? "Please wait..." : "Leave Comment"}
    //                                         </button>
    //                                     </Modal.Footer>
    //
    //                                 </Form>
    //                             )}
    //                         </Formik>
    //                     </div>
    //                 </div>
    //             </Modal.Body>
    //
    //         </Modal>
    //     </div>
    // );
}