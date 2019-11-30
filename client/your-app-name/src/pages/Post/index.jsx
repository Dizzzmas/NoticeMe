import Feed from "../Posts/post_feed";
import React, {useEffect} from "react";
import Post from "./post";
import {useParams} from "react-router";
import CommentFeed from "./comment_feed";


export default function PostPage(props) {
    let params = useParams();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
        <Post history={props.history}/>
        <p>Comments: </p>
            <CommentFeed history={props.history} post_id={params.postId} />
        </div>
    )
}
