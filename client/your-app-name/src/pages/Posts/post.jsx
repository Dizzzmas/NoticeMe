import React, {useContext, useState} from 'react';
import {AuthContext} from "../../services/auth";
import {Link} from "react-router-dom";
import moment from "moment";
import CommentModal from "../Post/comment_modal";
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

                return (
                <Modal show={props.show} onHide={props.handleClose} animation={false}>
                <Modal.Header closeButton>
                <Modal.Title>Delete Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                Are you sure you want to delete this post ?
                <Modal.Footer>
                <Button variant="secondary">Close</Button>
                <Button variant="danger" onClick={async () => {
                let res = await fetch(`/api/v1/posts/${props.post_id}`, {
                method: 'DELETE',
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

                const Likes = (props) => {
                let userContext = useContext(AuthContext);
                const [liked, setLiked] = useState(props.liked);
                const [likes_count, setLikesCount] = useState(parseInt(props.likes_count));

                let update_likes = async () => {
                if (liked) {
                let res = await fetch(`api/v1/users/${userContext.currentUser.id}/posts/${props.post_id}/unlike`, {
                method: 'DELETE'
                });
                if (res.ok && res.status === 204) {
                setLikesCount(likes_count - 1);
                setLiked(false);
                } else {
                console.log('could not unlike');
                }

                } else {
                let res = await fetch(`api/v1/users/${userContext.currentUser.id}/posts/${props.post_id}/like`, {
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
                <div className='likes'>
                Likes: {likes_count}
                {liked ? <button onClick={(e) => {
                e.stopPropagation();
                update_likes();
                }}>Unlike</button> : <button onClick={(e) => {
                e.stopPropagation();
                update_likes();
                }}>Like</button>}
                </div>
                )
                };

                const PostBody = (props) => {

                return (
                <PostBox>
                <div className="inner-body" onClick={() => {
                props.history.push({pathname: `/${props.post.user.username}/posts/${props.post.id}`});
                }}>
                <Avatar image={props.post.user.ava_url}/>
                <div className="body">

                <div className="inner-body">
                <UserName username={props.post.user.username} userId={props.post.user_id}/>
                <Handle handle={props.handle}/>
                <PostedOn posted_on={moment(props.post.createdAt).fromNow()}/>
                <Comments comments_count={props.post.comments.length}/>
                <CommentModal history={props.history} post_id={props.post.id}
                post_author={props.post.username}/>
                <PostOptions history={props.history} post_id={props.post.id}/>
                </div>
                <Images images={props.post.images}/>
                <Content content={props.post.content}/>
                <Likes post_id={props.post.id} liked={props.liked} likes_count={props.post.likes.length}/>
                </div>
                </div>
                </PostBox>
                )
                };

                const CommentBody = (props) => {
                return (
                <PostBox>
                <div className="inner-body">
                <Avatar image={props.user.ava_url}/>
                <div className="body">
                <div className="inner-body">
                <UserName username={props.user.username} userId={props.post.user_id}/>
                <Handle handle={props.handle}/>
                <PostedOn posted_on={moment(props.post.createdAt).fromNow()}/>
                </div>
                <Content content={props.content}/>


                </div>
                </div>
                </PostBox>
                )
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