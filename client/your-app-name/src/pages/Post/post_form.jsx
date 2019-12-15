import React, {useContext, useState} from "react";
import {AuthContext} from "../../services/auth";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";


export default function PostForm(props) {

    const [images, setImages] = useState();
    const [too_many_images, setTooManyImages] = useState(false);
    const userContext = useContext(AuthContext);
    const CreatePostSchema = Yup.object().shape({
        content: Yup.string()
            .required("Cannot create empty post")
    });


    return (


        <div className="news-feed-form">
            <Formik
                initialValues={{content: ""}}
                validationSchema={CreatePostSchema}
                onSubmit={async (values, actions) => {
                    console.log('Val: ', values);
                    console.log('FILES: ', values.files);

                    const formData = new FormData();

                    if (values.files) {
                        values.files.forEach((file, i) => {
                            formData.append(i, file)
                        });
                    }

                    const jwt = userContext.getJwt();
                    formData.append('content', values.content);
                    let res = await fetch(`/api/v1/users/${userContext.currentUser.id}/posts/new`, {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        },
                        body: formData
                    });
                    let new_post = await res.json();


                    if (res.ok && res.status === 201) {
                        let new_posts = props.posts;
                        console.log('NEW POST: ', new_post);
                        new_posts.unshift(new_post);
                        props.handlePostsUpdate(new_posts);
                        actions.setSubmitting(false);
                    }
                }
                }
            >
                {({touched, errors, isSubmitting, status, setFieldValue}) => (

                    <Form>
                        {/* Nav tabs */}
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active inline-items" data-toggle="tab" href="#home-1"
                                   role="tab" aria-expanded="true">

                                    <svg className="olymp-status-icon">
                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                             xlinkHref="assets/img/./icons.svg#olymp-status-icon"></use>
                                    </svg>

                                    <span>Make-A-Post</span>
                                </a>
                            </li>
                        </ul>

                        {/* Tab panes */}
                        <div className="tab-content">

                            <div className="tab-pane active" id="home-1" role="tabpanel" aria-expanded="true">

                                <div className="author-thumb">
                                    <img src={userContext.currentUser.avaUrl} alt="author"/>
                                </div>
                                <div className="form-group with-icon label-floating is-empty">
                                    <label className="control-label"></label>
                                    <Field
                                        type="text"
                                        name="content"
                                        placeholder="Share what you are thinking
                                            here..."
                                        component='textarea'
                                        className={`form-control ${
                                            touched.content && errors.content ? "is-invalid" : ""
                                        }`}
                                    />
                                    <ErrorMessage
                                        component="div"
                                        name="content"
                                        className="invalid-feedback"
                                    />

                                </div>
                                <div className="add-options-message">


                                    <input type='file' id='multi' accept="image/*"
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

                                    {/*<a href="#" className="options-message" data-toggle="tooltip"*/}
                                    {/*   data-placement="top" data-original-title="ADD PHOTOS">*/}
                                    {/*    <svg className="olymp-camera-icon" data-toggle="modal"*/}
                                    {/*         data-target="#update-header-photo">*/}
                                    {/*        <use xlinkHref="http://www.w3.org/1999/xlink"*/}
                                    {/*             xlinkHref="assets/img/./icons.svg#olymp-camera-icon"></use>*/}
                                    {/*    </svg>*/}
                                    {/*</a>*/}


                                    <button type="submit" className="btn btn-primary btn-md-2"
                                            style={{"backgroundColor": "#3d5fbf", "border": "0px"}}>
                                        {isSubmitting ? "Please wait..." : "Post"}
                                    </button>

                                </div>

                            </div>


                        </div>
                        < /Form>
                            )}
                        </Formik>
                    </div>


                );

                }