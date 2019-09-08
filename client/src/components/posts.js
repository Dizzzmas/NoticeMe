import React, {Component} from 'react'

class Posts extends Component{
    constructor() {
        super();
        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        fetch('/api/posts')
            .then(res => res.json())
            .then(posts => this.setState({posts}, () => console.log('Posts fetched...', posts)));
    }

    render() {
        return(
        <div>
            <h2>Posts</h2>
            <ul>
                {this.state.posts.map(post =>
                    <li key={post.id}>{post.body}</li> )}
            </ul>
        </div>
        );
    }
}

export default Posts