import React, {useContext, useEffect, useRef, useState} from 'react';
import {PostBody} from './post';
import debounce from "lodash.debounce";
import {AuthContext} from "../../services/auth";


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
    let loadPosts = () => {
        setIsLoading(true);
        fetch(`/api/v1/users/${userContext.currentUser.id}/followedPosts?page=${page}`)
            .then(response => response.json())
            .then(loaded_posts => {
                console.log('page: ', page);
                setHasMore(posts.length < loaded_posts.count);
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
        // if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        //     loadPosts()
        // }
    }, 100);


    return (

        <div className="main-body">
            {[...posts].map((post, index) => {


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
                return (
                    <PostBody
                        key={index}
                        post={post}
                        liked={liked}
                        history={props.history}
                    />
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
        </div>

    );


}

export default PostFeed
