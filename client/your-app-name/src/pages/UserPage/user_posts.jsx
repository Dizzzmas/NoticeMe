import React, {useContext, useEffect, useRef, useState} from 'react';

import debounce from "lodash.debounce";
import {AuthContext} from "../../services/auth";
import {CommentBody, PostBody} from "../Posts/post";
import CommentFeed from "../Post/comment_feed";
import CommentForm from "../Post/comment_form";


const ViewMoreComments = (props) => {
    const [page, setPage] = useState(1);

    return (
        <button
            onClick={async () => {
                let r = await fetch(`/api/v1/posts/GetPostComments/${props.post_id}?page=${page}`);
                let comments = await r.json();
                console.log('COMMIES: ', comments);
                let new_posts = props.posts;
                for (let i in new_posts) {
                    if (new_posts[i].id == props.post_id) {
                        new_posts[i].comments = new_posts[i].comments.concat(comments);
                        break;
                    }
                }
                console.log('POSTDZ: ',new_posts);
                props.handlePostsUpdate(new_posts);
                setPage(page + 1);

            }}
            className="more-comments">View more comments <span>+</span></button>
    )
}

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

function getScrollTop() {
    return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
}

function UserPosts(props) {
    let userContext = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [page, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const prevPage = usePrevious(page);


    let handlePostsUpdate = (new_posts) => {
        setPosts([]);
        setPosts(new_posts);
    };

    useEffect(() => {
        loadUserPosts();
    }, []);
    let loadUserPosts = () => {
        console.log('uId: ', props.userId);
        setIsLoading(true);
        fetch(`/api/v1/users/${props.userId}/posts/userPosts?page=${page}`)
            .then(response => response.json())
            .then(loaded_posts => {
                console.log('page: ', page);
                console.log('my lengthL: ', posts.length);
                console.log('all Posts: ', loaded_posts.count);
                console.log('HAS MORE? :', posts.length + 1 < loaded_posts.count);
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


        loadUserPosts();
        // if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        //     loadPosts()
        // }
    }, 100);


    return (

        <React.Fragment>


            {[...posts].map((post, index) => {
                console.log('POST: ', post);
                let liked = false;
                let styles = {
                    postBox: 'post-body',
                    avatar: 'avatar',
                    handle: 'handle',
                    postedOn: 'posted_on',
                    userName: 'username',
                    content: 'post',
                    likes: 'likes',
                };
                for (const like of post.likes) {
                    console.log(like);
                    console.log('curr: ', userContext.currentUser.id);
                    if (like.user_id == userContext.currentUser.id) {
                        liked = true;
                    }
                }
                console.log('NEEDED: ', post);
                return (
                    <div className="ui-block"
                         style={{"position": "relative", "left": "0px", "marginTop": "30px"}}>
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
                        <ViewMoreComments post_id={post.id} posts={posts} handlePostsUpdate={handlePostsUpdate}/>

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
            <div>You did it! You reached the end!</div>
            }
        </React.Fragment>
    );
    // return (
    //
    //     <div className="main-body">
    //         {[...posts].map((post, index) => {
    //
    //
    //             let liked = false;
    //             let styles = {
    //                 postBox: 'post-body',
    //                 avatar: 'avatar',
    //                 handle: 'handle',
    //                 postedOn: 'posted_on',
    //                 userName: 'username',
    //                 content: 'post',
    //                 likes: 'likes',
    //             };
    //             for (const like of post.likes) {
    //                 console.log(like);
    //                 console.log('curr: ', userContext.currentUser.id);
    //                 if (like.user_id == userContext.currentUser.id) {
    //                     liked = true;
    //                 }
    //             }
    //             return (
    //                 <PostBody
    //                     key={index}
    //                     post={post}
    //                     liked={liked}
    //                     history={props.history}
    //                 />
    //             )
    //         })}
    //         {error &&
    //         <div style={{color: '#900'}}>
    //             {error}
    //         </div>
    //         }
    //         {isLoading &&
    //         <div>Loading...</div>
    //         }
    //         {!hasMore &&
    //         <div>You did it! You reached the end!</div>
    //         }
    //     </div>
    //
    // );


}

export default UserPosts
