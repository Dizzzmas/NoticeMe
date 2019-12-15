import React, {useContext, useState} from 'react';
import {AuthContext} from "../../services/auth";
import {Link} from "react-router-dom";
import moment from "moment";
import CommentModal from "../Post/comment_form";
import {SplitButton, Dropdown, Modal, Button} from "react-bootstrap";


const PostBox = (props) => {
    return (
        <div className="post-body">
            {props.children}
        </div>
    )
};

const Avatar = (props) => {
    return (
        <img src={props.image} alt="Logo" className="avatar">
        </img>
    )
};

const Handle = (props) => {
    return (
        <div className="handle">
            {props.handle}
        </div>
    )
};

const PostedOn = (props) => {
    return (
        <div className="posted_on">
            {props.posted_on}
        </div>
    )
};

const UserName = (props) => {
    return (
        <div className="username" onClick={(e) => {
            e.stopPropagation();
        }}>
            <Link to={{pathname: `/${props.username}`}}>{props.username}</Link>
        </div>
    )
};

const Comments = (props) => {
    return (
        <div className='comments'>
            Comments: {props.comments_count}
        </div>
    )
};

const Content = (props) => {
    return (
        <div className="post">
            {props.content}
        </div>
    )
};

const Images = (props) => {
    return (

        <div className='post_images'>
            {Object.values(props.images).map((image, index) => {
                return (
                    <div key={index} className='post_image'><img key={index} src={image.image_url}
                                                                 width={15}
                                                                 height={15}/></div>
                )

                // TODO: Adjust pics size here, add modal with full size pic

            })
            }
        </div>
    )
};

const DeletePostModal = (props) => {
    let userContext = useContext(AuthContext);
    return (
        <Modal show={props.show} onHide={props.handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete this post ?
                <Modal.Footer>
                    <Button onClick={props.handleClose} variant="secondary">Close</Button>
                    <Button variant="danger" onClick={async () => {
                        const jwt = userContext.getJwt();
                        let res = await fetch(`/api/v1/posts/${props.post_id}`, {
                            method: 'DELETE',
                            headers: {
                                Authorization: `Bearer ${jwt}`,
                            }
                        });
                        if (res.ok && res.status === 204) {
                            console.log('Post deleted successfully');
                            props.handleClose();
                            props.history.push('/');            // TODO: REPLACE THIS WITH SOMETHING NORMAL
                            props.history.push('/posts');
                        } else {
                            console.log('error deleting post');
                        }
                    }
                    }>
                        Delete
                    </Button>
                </Modal.Footer>

            </Modal.Body>

        </Modal>
    )
};

const PostOptions = (props) => {

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => setShow(true);

    return (
        <div className='post-options' onClick={(e) => {
            e.stopPropagation();
        }}>

            <Dropdown onSelect={selectedKey => {
                if (selectedKey === 'delete') {
                    handleShow();
                }
            }}>
                <Dropdown.Toggle variant="primary" id="dropdown-split-basic"/>

                <Dropdown.Menu>
                    <Dropdown.Item eventKey="delete">Delete</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <React.Fragment>
                <DeletePostModal history={props.history} show={show} handleClose={handleClose} post_id={props.post_id}/>
            </React.Fragment>

        </div>
    )
};

const CommentOptions = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => setShow(true);

    return (
        <div className='comment-options' onClick={(e) => {
            e.stopPropagation();
        }}>

            <Dropdown onSelect={selectedKey => {
                if (selectedKey === 'delete') {
                    handleShow();
                }
            }}>
                <Dropdown.Toggle variant="primary" id="dropdown-split-basic"/>

                <Dropdown.Menu>
                    <Dropdown.Item eventKey="delete">Delete</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <React.Fragment>
                <DeleteCommentModal username={props.username} history={props.history} show={show}
                                    handleClose={handleClose}
                                    comment_id={props.comment_id} post_id={props.post_id}/>
            </React.Fragment>

        </div>
    )
};

const DeleteCommentModal = (props) => {
    let userContext = useContext(AuthContext);
    return (
        <Modal show={props.show} onHide={props.handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Comment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete this comment ?
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>Close</Button>

                    <Button variant="danger" onClick={async () => {
                        const jwt = userContext.getJwt();
                        let res = await fetch(`/api/v1/comments/${props.comment_id}`, {
                            method: 'DELETE',

                            headers: {
                                Authorization: `Bearer ${jwt}`,
                            }
                        });
                        if (res.ok && res.status === 204) {
                            console.log('Comment deleted successfully');
                            props.handleClose();
                            props.history.push('/');            // TODO: REPLACE THIS WITH SOMETHING NORMAL
                            props.history.push(`${props.username}/posts/${props.post_id}`);
                        } else {
                            console.log('error deleting post');
                        }
                    }
                    }>
                        Delete
                    </Button>
                </Modal.Footer>

            </Modal.Body>

        </Modal>
    )
};


const Likes = (props) => {
    let userContext = useContext(AuthContext);
    const [liked, setLiked] = useState(props.liked);
    const [likes_count, setLikesCount] = useState(parseInt(props.likes_count));

    let update_likes = async () => {
        if (liked) {
            let res = await fetch(`/api/v1/users/${userContext.currentUser.id}/posts/${props.post_id}/unlike`, {
                method: 'DELETE'
            });
            if (res.ok && res.status === 204) {
                setLikesCount(likes_count - 1);
                setLiked(false);
            } else {
                console.log('could not unlike');
            }

        } else {
            let res = await fetch(`/api/v1/users/${userContext.currentUser.id}/posts/${props.post_id}/like`, {
                method: 'POST'
            });
            if (res.ok && res.status === 201) {
                setLikesCount(likes_count + 1);
                setLiked(true);
            } else {
                console.log('could not like');
            }
        }
    };


    return (
        <a
            className="post-add-icon inline-items">
            <svg className="olymp-heart-icon">
                <use xlinkHref="assets/img/./icons.svg#olymp-heart-icon"></use>
            </svg>
            {liked ? <button onClick={(e) => {
                e.stopPropagation();
                update_likes();
            }}>Unlike</button> : <button onClick={(e) => {
                e.stopPropagation();
                update_likes();
            }}>Like</button>}
            <span>{likes_count}</span>
        </a>
    )
    // )return (
    //     <div className='likes'>
    //         Likes: {likes_count}
    //         {liked ? <button onClick={(e) => {
    //             e.stopPropagation();
    //             update_likes();
    //         }}>Unlike</button> : <button onClick={(e) => {
    //             e.stopPropagation();
    //             update_likes();
    //         }}>Like</button>}
    //     </div>
    // )
};

const CommentLikes = (props) => {
    let userContext = useContext(AuthContext);
    const [liked, setLiked] = useState(props.liked);
    const [likes_count, setLikesCount] = useState(parseInt(props.likes_count));

    let update_likes = async () => {
        if (liked) {
            let res = await fetch(`/api/v1/users/${userContext.currentUser.id}/comments/${props.comment_id}/unlike`, {
                method: 'DELETE'
            });
            if (res.ok && res.status === 204) {
                setLikesCount(likes_count - 1);
                setLiked(false);
            } else {
                console.log('could not unlike');
            }

        } else {
            let res = await fetch(`/api/v1/users/${userContext.currentUser.id}/comments/${props.comment_id}/like`, {
                method: 'POST'
            });
            if (res.ok && res.status === 201) {
                setLikesCount(likes_count + 1);
                setLiked(true);
            } else {
                console.log('could not like');
            }
        }
    };


    return (
        <a
           className="post-add-icon inline-items">
            <svg className="olymp-heart-icon">
                <use xlinkHref="assets/img/./icons.svg#olymp-heart-icon"></use>
            </svg>
            {liked ? <button onClick={(e) => {
                e.stopPropagation();
                update_likes();
            }}>Unlike</button> : <button onClick={(e) => {
                e.stopPropagation();
                update_likes();
            }}>Like</button>}
            <span>{likes_count}</span>
        </a>
    )
    // ) return (
    //     <div className='likes'>
    //         Likes: {likes_count}
    //         {liked ? <button onClick={(e) => {
    //             e.stopPropagation();
    //             update_likes();
    //         }}>Unlike</button> : <button onClick={(e) => {
    //             e.stopPropagation();
    //             update_likes();
    //         }}>Like</button>}
    //     </div>
    // )
};

const PostBody = (props) => {
    let userContext = useContext(AuthContext);
    return (
        <article className="hentry post">

            <div className="post__author author vcard inline-items">
                <img src={props.post.user.ava_url} alt="author"/>

                <div className="author-date">
                    <Link className="h6 post__author-name fn"
                          to={{pathname: `/${props.post.user.username}`}}>{props.post.user.username} {props.post.user.verified}</Link>

                    <div className="post__date">
                        <time className="published" dateTime={props.post.createdAt}>
                            {moment(props.post.createdAt).fromNow()}
                        </time>
                    </div>
                </div>

                <div className="more">
                    <svg className="olymp-three-dots-icon">
                        <use xlinkHref="../../assets/img/./icons.svg#olymp-three-dots-icon"></use>
                    </svg>
                    <ul className="more-dropdown">
                        <li>
                            <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">Edit
                                Post</a>
                        </li>
                        <li>
                            <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">Delete
                                Post</a>
                        </li>

                    </ul>
                </div>

            </div>

            <p>{props.post.content}
            </p>

            {/*likes here*/}
            <div className="post-additional-info inline-items">

                <Likes post_id={props.post.id} liked={props.liked} likes_count={props.post.likes.length}/>
                {/*
<ul class="friends-harmonic">
<li>
<a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
<img src="assets/img/./friend-harmonic7.jpg" alt="friend">
</a>
</li>
<li>
<a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
<img src="assets/img/./friend-harmonic8.jpg" alt="friend">
</a>
</li>
<li>
<a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
<img src="assets/img/./friend-harmonic9.jpg" alt="friend">
</a>
</li>
<li>
<a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
<img src="assets/img/./friend-harmonic10.jpg" alt="friend">
</a>
</li>
<li>
<a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
<img src="assets/img/./friend-harmonic11.jpg" alt="friend">
</a>
</li>
</ul> */}


                <div className="comments-shared">
                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                       className="post-add-icon inline-items">
                        <svg className="olymp-speech-balloon-icon">
                            <use
                                xlinkHref="assets/img/./icons.svg#olymp-speech-balloon-icon"></use>
                        </svg>
                        <span>{props.post.comments.length}</span>
                    </a>

                </div>


            </div>

            {/*                        <div class="control-block-button post-control-button">

<a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#" class="btn btn-control">
<svg class="olymp-like-post-icon">
<use   xlinkHref="assets/img/./icons.svg#olymp-like-post-icon"></use>
</svg>
</a>

<a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#" class="btn btn-control">
<svg class="olymp-comments-post-icon">
<use   xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
</svg>
</a>

<a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#" class="btn btn-control">
<svg class="olymp-share-icon">
<use   xlinkHref="assets/img/./icons.svg#olymp-share-icon"></use>
</svg>
</a>

</div> */}

        </article>

    )
    // )    <PostBox>
    //         <div className="inner-body" onClick={() => {
    //             props.history.push({pathname: `/${props.post.user.username}/posts/${props.post.id}`});
    //         }}>
    //             <Avatar image={props.post.user.ava_url}/>
    //             <div className="body">
    //
    //                 <div className="inner-body">
    //                     <UserName username={props.post.user.username} userId={props.post.user_id}/>
    //                     <Handle handle={props.post.user.handle}/>
    //                     <PostedOn posted_on={moment(props.post.createdAt).fromNow()}/>
    //                     <Comments comments_count={props.post.comments.length}/>
    //                     <CommentModal history={props.history} post_id={props.post.id}
    //                                   post_author={props.post.username}/>
    //                     {(props.post.user.id === userContext.currentUser.id || userContext.currentUser.role) &&
    //                     <PostOptions history={props.history} post_id={props.post.id}/>
    //                     }
    //                 </div>
    //                 <Images images={props.post.images}/>
    //                 <Content content={props.post.content}/>
    //                 <Likes post_id={props.post.id} liked={props.liked} likes_count={props.post.likes.length}/>
    //             </div>
    //         </div>
    //     </PostBox>
    // )
};

const CommentBody = (props) => {
    let userContext = useContext(AuthContext);
    return (
        <li className="comment-item">
            <div className="post__author author vcard inline-items">
                <img src={props.comment.user.ava_url} alt="author"/>

                <div className="author-date">

                    <Link className="h6 post__author-name fn"
                          to={{pathname: `/${props.comment.user.username}`}}>{props.comment.user.username} {props.comment.user.verified}</Link>

                    <div className="post__date">
                        <time className="published" dateTime={props.comment.createdAt}>
                            {moment(props.comment.createdAt).fromNow()}
                        </time>
                    </div>
                </div>

                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                   className="more">
                    <svg className="olymp-three-dots-icon">
                        <use xlinkHref="assets/img/./icons.svg#olymp-three-dots-icon"></use>
                    </svg>
                </a>

            </div>

            <p>{props.comment.content}</p>


            <CommentLikes comment_id={props.comment.id} liked={props.liked} likes_count={props.comment.likes.length}/>
        </li>

    )
    // )return (
    //     <PostBox>
    //         <div className="inner-body">
    //             <Avatar image={props.user.ava_url}/>
    //             <div className="body">
    //                 <div className="inner-body">
    //                     <UserName username={props.user.username} userId={props.post.user_id}/>
    //                     <Handle handle={props.user.handle}/>
    //                     <PostedOn posted_on={moment(props.post.createdAt).fromNow()}/>
    //                     {(props.user.id === userContext.currentUser.id || userContext.currentUser.role) &&
    //                     <CommentOptions username={props.user.username} history={props.history} comment_id={props.id}
    //                                     post_id={props.post.id}/>
    //                     }
    //                 </div>
    //                 <Content content={props.content}/>
    //                 <CommentLikes comment_id={props.id} liked={props.liked} likes_count={props.likes.length}/>
    //
    //
    //             </div>
    //         </div>
    //     </PostBox>
    // )
};

export {
    PostBody,
    CommentBody,
    PostBox,
    Likes,
    Content,
    UserName,
    Handle,
    Avatar,
    PostedOn
}