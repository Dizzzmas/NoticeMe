import React, {useContext, useEffect, useRef, useState} from 'react';
import debounce from "lodash.debounce";
import {AuthContext} from "../../services/auth";
import {CommentBody} from "../Posts/post";


const usePrevious = current => {
    const ref = useRef()
    useEffect(() => {
        ref.current = current
    });
    return ref.current
};


function CommentFeed(props) {
    let userContext = useContext(AuthContext);
    const [comments, setComments] = useState([]);
    const [page, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const prevPage = usePrevious(page);

    useEffect(() => {

        loadComments();

    }, []);


    let loadComments = () => {
        setIsLoading(true);
        fetch(`/api/v1/posts/GetAllComments/${props.post_id}?page=${page}`)
            .then(response => response.json())
            .then(loaded_comments => {
                console.log('page: ', page);
                setHasMore(comments.length < loaded_comments.count);
                setIsLoading(false);
                setComments(comments.concat(loaded_comments.rows));
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
            loadComments()
        }
    }, 100);

    return (

        <div className="main-body">
            {[...comments].map((comment, index) => {


                // let liked = false;
                let styles = {
                    postBox: 'post-body',
                    avatar: 'avatar',
                    handle: 'handle',
                    postedOn: 'posted_on',
                    userName: 'username',
                    content: 'post',
                    likes: 'likes',
                };
                // for (const like of post.likes) {
                //     console.log(like);
                //     console.log('curr: ', userContext.currentUser.id);
                //     if (like.userId == userContext.currentUser.id) {
                //         liked = true;
                //     }
                // }


                return (
                    <CommentBody
                        key={index}
                        post={comment.post}
                        user={comment.user}
                        content={comment.content}
                        id={comment.id}
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

export default CommentFeed
