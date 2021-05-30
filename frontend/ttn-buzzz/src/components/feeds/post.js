import React from 'react';
import './post.css';
import profile from '../profile/surabhi.jpg';
import {connect} from 'react-redux';
import M from 'materialize-css';
import $ from 'jquery';

class Post extends React.Component{
  constructor(){
    super()
    this.state = {
      likedpost : [],
      dislikedpost : []
    }
  }
  

  handlePostLike (post_id) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("post_id", post_id);
    urlencoded.append("user_id", this.props.user.user_id);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch("http://localhost:9000/reaction/like", requestOptions)
      .then(response => response.json())
      .then(result => {
        this.setState({
          ...this.state,
          likedpost: [result.data]
        })
      })
      .catch(error => console.log('error', error));
  }

  handlePostDislike (post_id) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("post_id", post_id);
    urlencoded.append("user_id", this.props.user.user_id);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch("http://localhost:9000/reaction/dislike", requestOptions)
      .then(response => response.json())
      .then(result => {
        this.setState({
          ...this.state,
          dislikedpost: [result.data]
        })
      })
      .catch(error => console.log('error', error));
  }

  handlePostComment(post_id, comment) {
    console.log(post_id, comment)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    var urlencoded = new URLSearchParams();
    urlencoded.append("post_id", post_id);
    urlencoded.append("user_id", this.props.user.user_id);
    urlencoded.append("comment_description", comment);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch("http://localhost:9000/reaction/comment", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result.message);
      })
      .catch(error => console.log('error', error));
  }

  handleReportPost (post_id) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("post_id", post_id);
    urlencoded.append("status", "flagged");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch("http://localhost:9000/post/reportpost", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result.message)
        M.toast({html: 'Post is marked as reported'})
      })
      .catch(error => console.log('error', error));
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
                <i className="fas fa-ellipsis-h options" onClick={(e) => this.handleReportPost(post._id)}>
                  <p className="report-post">Report</p>
                </i>
                      
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
                <div className="like" onClick={(e) => this.handlePostLike(post._id)}>
                <i class="far fa-thumbs-up like-icon"></i>Like
                </div>
                <div className="dislike" onClick={(e) => this.handlePostDislike(post._id)}> 
                <i class="far fa-thumbs-down dislike-icon"></i>Dislike
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
            ref="postcomment"
            id="textarea"
            className="materialize-textarea"
          ></textarea>
          <label for="textarea">Write a Comment...</label>
          
        </div>
        <a className="btn comment-btn" onClick={(e) => this.handlePostComment(post._id, this.refs.postcomment.value)}>send</a>
        </div>
            </div>
          )
        })           
        
    );
      }
}

const mapStateToProps = (state) => {
  return {
    user: state || {}
  }
}

export default connect(mapStateToProps)(Post);