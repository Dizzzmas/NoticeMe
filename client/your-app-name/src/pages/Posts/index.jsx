import React, {useState} from "react";
import PostFeed from "./post_feed";



export default function Posts(props) {
    return (
            <PostFeed history={props.history}/>
    )
}
