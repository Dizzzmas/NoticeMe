import {PostBody} from "../Posts/post";
import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router";
import {AuthContext} from "../../services/auth";


function Post(props) {

    let slug = useParams();
    let userContext = useContext(AuthContext);
    let postId_from_path = slug.postId;
    console.log(postId_from_path);
    const [post, setPost] = useState({id: postId_from_path});

    useEffect(() => {
            loadPost();
            console.log(post);
        }, []
    );

    let liked, handle;
    let loadPost = () => {
        fetch(`/api/v1/posts/${post.id}`)
            .then(response => response.json())
            .then(loaded_post => {
                    console.log('Post: ', loaded_post);
                    liked = false;
                    for (const like of loaded_post.likes) {
                        console.log(like);
                        if (like.userId == userContext.currentUser.id) {
                            liked = true;
                        }
                    }
                    handle = `@${loaded_post.user.username}`;
                    setPost(loaded_post);
                }
            ).catch((err) => {
            console.error(err);
            console.log('Loading post\'s page failed')
        });
    };
    console.log(post);


    return (
        <div>
            {post.user &&
            <PostBody
                post={post}
                liked={liked}
                handle={handle}
                history={props.history}
            />}

        </div>
    )
}


export default Post;