import React, {useContext, useEffect, useRef, useState} from 'react';
import {CommentBody, PostBody} from './post';
import debounce from "lodash.debounce";
import {AuthContext} from "../../services/auth";
import CommentForm from "../Post/comment_form";
import PostForm from "../Post/post_form";


const usePrevious = current => {
    const ref = useRef()
    useEffect(() => {
        ref.current = current
    });
    return ref.current
};

function getDocumentHeight() {
    const body = document.body;
    const html = document.documentElement;

    return Math.max(
        body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight
    );
};

const ViewMoreComments = (props) => {

    let pageSize = process.env.COMMENT_PAGE_SIZE || 4;
    let needed_page = Math.ceil(props.post.comments.length / pageSize) + 1;
    console.log(needed_page);
    console.log(needed_page);
    const [end_of_comments, setEndOfComments] = useState(false);
    // const [page, setPage] = useState(2);
    //
    return (

        <button
            onClick={async () => {
                let r = await fetch(`/api/v1/posts/GetPostComments/${props.post_id}?page=${needed_page}`);
                let comments = await r.json();
                console.log('COMMIES: ', comments);
                let new_posts = props.posts;
                if (!new_posts) {
                    setEndOfComments(true);
                }
                for (let i = 0; i < new_posts.length; i++) {
                    if (new_posts[i].id == props.post_id) {
                        new_posts[i].comments = new_posts[i].comments.concat(comments.rows);
                        break;
                    }
                }
                if (comments)
                    props.handlePostsUpdate(new_posts);

            }}
            className="more-comments">View more comments <span>+</span></button>
    )
};


function getScrollTop() {
    return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
}

function PostFeed(props) {
    let userContext = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [page, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const prevPage = usePrevious(page);

    useEffect(() => {
        loadPosts();
    }, []);

    let handlePostsUpdate = (new_posts) => {
        setPosts([]);
        setPosts(new_posts);
    };

    let loadPosts = () => {
        setIsLoading(true);
        const jwt = userContext.getJwt();
        fetch(`/api/v1/users/${userContext.currentUser.id}/followedPosts?page=${page}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        })
            .then(response => response.json())
            .then(loaded_posts => {
                console.log('page: ', page);
                setHasMore(posts.length <= loaded_posts.count);
                setIsLoading(false);
                setPosts(posts.concat(loaded_posts.rows));
                setCurrentPage(page + 1);
            })
            .catch((err) => {
                setError(err.message);
                setIsLoading(false);
            })
    };


    window.onscroll = debounce(() => {
        if (error || isLoading || !hasMore) return;

        if (getScrollTop() < getDocumentHeight() - window.innerHeight) return;
        loadPosts();

    }, 100);


    return (
        <React.Fragment>

            <PostForm posts={posts} handlePostsUpdate={handlePostsUpdate} history={props.history}/>

            {[...posts].map((post, index) => {
                console.log('POST: ', post);
                let liked = false;
                for (const like of post.likes) {
                    console.log(like);
                    console.log('curr: ', userContext.currentUser.id);
                    if (like.user_id == userContext.currentUser.id) {
                        liked = true;
                    }
                }
                console.log('NEEDED: ', post);
                return (


<div className="ui-block" style={{"position": "relative", "left": "0px", "marginTop": "30px"}}>

                        <PostBody
                            key={index}
                            post={post}
                            liked={liked}
                            history={props.history}
                        />
                        <ul className="comments-list">
                            {post.comments.map((comment, index) => {

                                let liked_comment = false;
                                for (const like of comment.likes) {
                                    if (like.user_id == userContext.currentUser.id) {
                                        liked_comment = true;
                                    }
                                }
                                return (
                                    <CommentBody
                                        key={index}
                                        comment={comment}
                                        liked={liked_comment}
                                        history={props.history}
                                    />
                                )
                            })}
                        </ul>
                        {post.comments.length != post.commentsCount ?
                            <ViewMoreComments post_id={post.id} post={post} posts={posts}
                                              handlePostsUpdate={handlePostsUpdate}/>
                            : <span>No More Comments</span>}

                        <CommentForm posts={posts} handlePostsUpdate={handlePostsUpdate} post_id={post.id}/>

                    </div>
                )
            })}

            {error &&
            <div style={{color: '#900'}}>
                {error}
            </div>
            }
            {isLoading &&
            <div>Loading...</div>
            }
            {!hasMore &&
            <div>You're spending your life watching other's unrealistic lives! Congratulations! You reached the end!</div>
            }
        </React.Fragment>

    );
}


export default PostFeed
