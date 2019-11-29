import React, {useContext, useEffect, useRef, useState} from 'react';
import {PostBody} from './post';
import moment from 'moment';
import debounce from "lodash.debounce";
import {AuthContext} from "../../services/auth";


const usePrevious = current => {
    const ref = useRef()
    useEffect(() => {
        ref.current = current
    });
    return ref.current
};


function Feed(props) {
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
        fetch(`/api/v1/posts?page=${page}`)
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

        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            loadPosts()
        }
    }, 100);


    return (
        <div className="main-body">
            {[...posts].map((post, index) => {
                let username = `${post.user.username}`;
                let handle = `@${post.user.username}`;
                let avatar = post.user.avaUrl;
                let content = `${post.content}`;
                let posted_on = moment(post.createdAt).fromNow();
                let likes_count = `${post.likes.length}`;
                let liked = false;
                let userId = post.userId;
                for (const like of post.likes) {
                    console.log(like);
                    console.log('curr: ', userContext.currentUser.id);
                    if (like.userId == userContext.currentUser.id) {
                        liked = true;
                    }
                }
                let post_id = post.id;
                return (
                    <PostBody
                        key={index}
                        post_id={post_id}
                        username={username}
                        handle={handle}
                        content={content}
                        avatar={avatar}
                        posted_on={posted_on}
                        likes_count={likes_count}
                        liked={liked}
                        userId={userId}
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

export default Feed
