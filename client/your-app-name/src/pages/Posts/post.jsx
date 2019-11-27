import React, {useContext, useState} from 'react';
import {AuthContext} from "../../services/auth";

// TODO: Add comments to posts, allow users follow each other

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
        <div className="username">
            {props.username}
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
            }
            else{
              console.log('could not unlike');
            }

        } else {
            let res = await fetch(`api/v1/users/${userContext.currentUser.id}/posts/${props.post_id}/like`, {
                method: 'POST'
            });
            if (res.ok && res.status === 201) {
                setLikesCount(likes_count + 1);
                setLiked(true);
            }
            else{
              console.log('could not like');
            }
        }
    };


    return (
        <div className='likes'>
            Likes: {likes_count}
            {liked ? <button onClick={update_likes}>Unlike</button> : <button onClick={update_likes}>Like</button>}
        </div>
    )
};

const PostBody = (props) => {

    return (
        <PostBox>
            <div className="inner-body">
                <Avatar image={props.avatar}/>
                <div className="body">
                    <div className="inner-body" onClick={() => alert('asdas')}>
                        <UserName username={props.username}/>
                        <Handle handle={props.handle}/>
                        <PostedOn posted_on={props.posted_on}/>
                    </div>
                    <Content content={props.content}/>
                    <Likes post_id={props.post_id} liked={props.liked} likes_count={props.likes_count}/>
                </div>

            </div>
        </PostBox>
    )
};

export {PostBody}