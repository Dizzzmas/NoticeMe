import React, {useContext, useState} from "react";
import {Alert, Button, Modal} from "react-bootstrap";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {AuthContext} from "../../services/auth";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImages} from "@fortawesome/free-solid-svg-icons";
import Images_Preview from "../../components/images_preview";


export default function PostModal(props) {
    const [show, setShow] = useState(false);
    const [images, setImages] = useState();
    const [too_many_images, setTooManyImages] = useState(false);
    const userContext = useContext(AuthContext);
    const CreatePostSchema = Yup.object().shape({
        content: Yup.string()
            .required("Cannot create empty post")
    });


    const handleClose = () => {
        setImages();
        setTooManyImages(false);
        setImages();
        setShow(false)
    };
    const handleShow = () => setShow(true);

    let removeImagePreview = (name) => {
        setImages(images.filter(image => image.name !== name))
    };

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
                                    const formData = new FormData();

                                    if (values.files) {
                                        values.files.forEach((file, i) => {
                                            formData.append(i, file)
                                        });
                                    }

                                    formData.append('content', values.content);
                                    let res = await fetch(`/api/v1/users/${userContext.currentUser.id}/posts/new`, {
                                        method: 'POST',
                                        headers: {},
                                        body: formData
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
                                {({touched, errors, isSubmitting, status, setFieldValue}) => (


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

                                        <div className="form-group">
                                            <div className='buttons fadein'>
                                                <div className='button'>
                                                    <label htmlFor='multi'>
                                                        <FontAwesomeIcon icon={faImages} color='#6d84b4' size='3x'/>
                                                    </label>
                                                    <input hidden={true} type='file' id='multi' accept="image/*"
                                                           onChange={(e) => {
                                                               if (e.target.files.length > 2) {
                                                                   status = {message: 'You are allowed to upload a maximum of 2 images'};
                                                                   setTooManyImages(true);
                                                                   return;
                                                               }
                                                               const files = Array.from(e.target.files);
                                                               console.log('Files count: ', e.target.files.length);
                                                               setFieldValue("files", files);
                                                               setImages(files);
                                                           }} multiple/>
                                                    {images && <Images_Preview images={images}
                                                                               removeImagePreview={removeImagePreview}/>}
                                                    {too_many_images && <Alert variant='danger'>
                                                        You are allowed to upload a maximum of 2 images</Alert>}
                                                </div>
                                            </div>
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