import React from 'react';
import './post.css';
import profile from '../profile/surabhi.jpg';

const Post = () => {
    return (
        
                <div className="card card-div">
                    <div className="post-detail">
                        <div className="post-user">
                        <img src={profile} className="circle picture" alt="profile" />
                        </div>
                        <div className="details">
                           <div> name</div>
                          <div>  created at</div>
                        </div>
                        <div className="options">
                        <i class="fas fa-ellipsis-h"></i>
                            </div>
                    </div>
                    <div className="post-caption">
                        caption
                    </div>
                    <div className="post-image">
                    <img src={profile} className="post-img" alt="profile" />
                    </div>
                    <div className="reactions-count">
                        <div className="like-count">
                        <i class="far fa-thumbs-up likes"></i>count
                        </div>
                        <div className="dislike-count"> 
                        <i class="far fa-thumbs-down dislikes"></i>count
                        </div>
                        <div className="comment-count">
                        count Comment
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
        
    );
}

export default Post;