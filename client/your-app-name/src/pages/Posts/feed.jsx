import React, {useEffect, useRef, useState} from 'react';
import {TweetBody} from './tweet';
import moment from 'moment';
import {Button} from 'react-bootstrap';
import debounce from "lodash.debounce";


const usePrevious = current => {
    const ref = useRef()
    useEffect(() => {
        ref.current = current
    });
    return ref.current
};


function Feed(props) {

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
                console.log(page);

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
                let name = `${post.user.username}`;
                let handle = `@${post.user.username}`;
                let image = post.user.avaUrl;
                let tweet = post.content;
                let posted_on = moment(post.createdAt).fromNow();
                return (
                    <TweetBody
                        key={index}
                        name={name}
                        handle={handle}
                        tweet={tweet}
                        image={image}
                        posted_on={posted_on}/>
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
