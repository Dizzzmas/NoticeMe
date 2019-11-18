import React, {useEffect, useState} from 'react';
import {TweetBody} from './tweet';


function Feed(props) {


    let fetchPosts = async (page) => {
        try {
            let posts_req = await fetch(`/api/v1/posts?page=${page}`);
            let posts = await posts_req.json();
            return posts;
        } catch (error) {
            console.log('Fetching posts failed');
            console.error(error);
        }
    };
    let initial_posts = fetchPosts(1);
    const [posts, setPosts] = useState();
    useEffect(() => {
    setPosts(fetchPosts(1));
  }, []);

    return (
        <div className="main-body">
            {[...posts].map((post, index) => {
          let name = `${post.name.first} ${post.name.last}`
          let handle = `@${post.name.first}${post.name.last}`
          let image = post.image
          let tweet = post.tweet
          console.log(image)
          return(
            <TweetBody
              key={index}
              name={name}
              handle={handle}
              tweet={tweet}
              image={image} />
          )
        })}
        </div>
    );

}

export default Feed