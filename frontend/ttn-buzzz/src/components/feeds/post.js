import React from 'react';
import './post.css';
import profile from '../profile/surabhi.jpg';
import M from 'materialize-css';
import $ from 'jquery';

class Post extends React.Component{
  constructor(){
    super()
    this.state = {
      posts : []
    }
  }
  
    render() {
    return (
        this.props.posts.map(post => {
          var objdate = new Date(post.created_at);
          post.created_at = `${objdate.getDate()}-${(objdate.getMonth()+1)}-${objdate.getFullYear()}`
          return (
            <div className="card card-div">
            <div className="post-detail">
                <div className="post-user">
                <img src={profile} className="circle picture" alt="profile" />
                </div>
                <div className="details">
                   <div> name</div>
                  <div>{post.created_at}</div>
                </div>
                <i class="fas fa-ellipsis-h" ></i>
                      
            </div>
            <div className="post-caption">
                {post.caption}
            </div>
            <div className="post-image">
            <img src={post.images[0]} className="post-img" />
            </div>
            <div className="reactions-count">
                <div className="like-count">
                <i class="far fa-thumbs-up likes"></i>{post.like_count}
                </div>
                <div className="dislike-count"> 
                <i class="far fa-thumbs-down dislikes"></i>{post.dislike_count}
                </div>
                <div className="comment-count">
                 {post.comment_count} Comments
                </div>
            </div>
            <div className="post-reactions">
                <div className="like">
                <i class="far fa-thumbs-up"></i>Like
                </div>
                <div className="dislike"> 
                <i class="far fa-thumbs-down"></i>Dislike
                </div>
                <div className="comment">
                <i class="far fa-comment-alt"></i>Comment
                </div>
            </div>
            <div className="post-comment">
            <div className="profile-img">
          <img src={profile} className="circle picture" alt="profile" />
        </div>
        
        <div className="input-field comment-area">
          <textarea
            id="textarea"
            className="materialize-textarea"
          ></textarea>
          <label for="textarea">Write a Comment...</label>
        </div>
      
        </div>
            </div>
          )
        })           
        
    );
      }
}

export default Post;