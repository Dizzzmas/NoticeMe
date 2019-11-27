import React from 'react';

// TODO: Add comments and likes to posts, allow users follow each other

const PostBox = (props) => {
  return(
    <div className="post-body">
      {props.children}
    </div>
  )
};

const Avatar = (props) => {
  return(
    <img src={props.image} alt="Logo" className="avatar">
    </img>
  )
};

const Handle = (props) => {
  return(
    <div className="handle">
      {props.handle}
    </div>
  )
};

const PostedOn = (props) => {
  return(
      <div className="posted_on">
        {props.posted_on}
      </div>
  )
};

const UserName = (props) => {
  return(
    <div className="username">
      {props.username}
    </div>
  )
};

const Content = (props) => {
  return(
    <div className="post">
      {props.content}
    </div>
  )
};

const PostBody = (props) => {
  return(
    <PostBox>
      <div className="inner-body">
        <Avatar image={props.avatar}/>
        <div className="body" onClick={() => alert('asdas')}>
          <div className="inner-body">
            <UserName username={props.username}/>
            <Handle handle={props.handle}/>
            <PostedOn posted_on={props.posted_on}/>
          </div>
          <Content tweet={props.content}/>
        </div>
      </div>
    </PostBox>
  )
};

export { PostBody }