import React from "react";
import "./feeds.css";
import { connect } from 'react-redux';
import banner from "./bg.jpg";
import profile from "../profile/surabhi.jpg";
import Header from "../header/header";
import CreatePost from './createpost';
import {updateProfile} from '../../actions/action'
import Post from "./post";
import M from 'materialize-css';
import $ from 'jquery';
class Feeds extends React.Component {
  constructor () {
    super()
    this.state = {
      contactlist: [],
      suggestionlist: [],
      posts: []
    }
  }

  redirectToProfile(user_id) {
    console.log(user_id)
     this.props.history.push(`/viewprofile/${user_id}`)
  }

  openModal () {
    var instance = M.Modal.getInstance($("#modal2"));
    instance.open();
  }

  handleSendFriendRequest (friend_id) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("user_id", this.props.user.user_id);
    urlencoded.append("friend_id", friend_id);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch("http://localhost:9000/user/sendfriendrequest", requestOptions)
      .then(response => response.json())
      .then(result => {
        this.props.updateProfile(result.data)
      })
      .catch(error => console.log('error', error));
  }

  handlePostLike () {
    
  }

  componentDidMount() {
    
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
  //  console.log(this.props.user)
  //   fetch(`http://localhost:9000/user/contactlist?user_id=${this.props.user.user_id}`, requestOptions)
  //     .then(response => response.json())
  //     .then(result => {
  //       this.setState({
  //       ...this.state,
  //       contactlist: result.contactlist
  //     })
  //   })
  //     .catch(error => console.log('error', error));

      fetch(`http://localhost:9000/user/suggestionlist?user_id=${this.props.user.user_id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        this.setState({
        ...this.state,
        suggestionlist: result.suggestionlist
      })
    })
      .catch(error => console.log('error', error));

      fetch(`http://localhost:9000/post/getposts?user_id=${this.props.user.user_id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        this.setState({
        ...this.state,
        posts: result.posts
      })
      console.log(this.state)
    })
      .catch(error => console.log('error', error));

  }
  render() {
    return (
      <div className="feeds-container">
        <Header />
        <div className="row">
          <div className="col">
            <div className="row">
              <div className="card profile-card">
                <div className="cover-banner">
                  <img className="banner" src={banner} alt="banner" />
                  <div className="profile">
                    <img
                      className="profile-pic1 circle"
                      src={this.props.user.profile_pic}
                      alt="profile-pic"
                    />
                  </div>
                </div>
                <div className="profile-name">
                  <span className="name">{this.props.user.first_name + " " + this.props.user.last_name}</span>
                  <p>{this.props.user.designation}</p>
                </div>
                <div className="row profile-description">
                  <div className="col des">{(this.props.user.friends? this.props.user.friends.length:0)} Friends</div>
                  <div className="col">{this.props.user.post_count} Posts</div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="card c-2">
                <div className="recent">
                  <span>Recent</span>
                  <ul className="list">
                    <li>
                      <i class="fas fa-hashtag"></i>javascript
                    </li>
                    <li>
                      <i class="far fa-calendar-check"></i>Mobile Trends
                      Conference
                    </li>
                    <li>
                      <i class="fas fa-user-friends"></i>Freelance Developers
                    </li>
                    <li>
                      <a>
                        <i class="fas fa-chevron-up"></i>Show More
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="group">
                  <span> Groups</span>
                  <ul className="list">
                    <li>
                      <i class="fas fa-hashtag"></i>javascript
                    </li>
                    <li>
                      <i class="far fa-calendar-check"></i>Mobile Trends
                      Conference
                    </li>
                    <li>
                      <i class="fas fa-user-friends"></i>Freelance Developers
                    </li>
                    <li>
                      <a>
                        <i class="fas fa-chevron-up"></i>Show 6 More
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="subscription">
                  <span> Subscriptions</span>
                  <ul>
                    <li>
                      <i class="fas fa-lightbulb"></i>Programming with Mosh
                    </li>
                    <li>
                      <i class="fas fa-recycle"></i>E-Learning Bridge
                    </li>
                    <li>
                      <i class="fas fa-laptop-code"></i>Clever Programmer
                    </li>
                    <li>
                      <a>
                        <i class="fas fa-chevron-up"></i>Show 6 More
                      </a>
                    </li>
                  </ul>
                  </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="row">
              <div className="card c-3">
                <div className="pic-div">
                  <img src={this.props.user.profile_pic} className="circle pic" alt="profile" />
                </div>
                <div className="create-post" onClick={this.openModal}></div>
                <div id="modal2" class="modal">
                  <CreatePost/>
                </div>
                
                <div className="photo-div">
                  <i className="fas fa-images photo-upload">
                    <span className="photo-upload-text">Photo/Video</span>
                  </i>
                </div>
              </div>
            </div>
            <div className="row">
              <Post posts={this.state.posts}/>
            </div>
          </div>
          <div className="col">
            <div className="row">
              <div className="card c-4">
                <div className="s-heading">
                  <div className="heading">Contacts</div>
                  <div>
                    <i className="material-icons">search</i>
                  </div>
                </div>
                {
                  this.state.contactlist.map(friend => {
                    return (
                      <div className="contact-profile" onClick={(e) => this.redirectToProfile(friend.user_id)}>
                        <div className="s-img">
                          <img src={friend.profile_pic} className="circle s-profile" alt="image" />
                        </div>
                        <div className="s-name">{friend.first_name + " " + friend.last_name}</div>    
                      </div>
                    )
                  })
                } 
              </div>
            </div>
            <div className="row">
              <div className="card c-4">
                <div className="s-heading">
                  <div className="heading">Suggestions</div>
                  <div>
                    <i className="material-icons">search</i>
                  </div>
                </div>
                {
                  this.state.suggestionlist.map(user => {
                    return (
                      <div className="suggestion-profile">
                    <div className="s-img">
                      <img src={user.profile_pic} className="circle s-profile" alt="suggestion-user"/>
                    </div>
                    <div className="s-name" onClick={(e) => this.redirectToProfile(user.user_id)}>{user.first_name + " " + user.last_name}</div>
                    <div className="add">
                      <a className="add-friend" href="#" onClick={(e) => this.handleSendFriendRequest(user.user_id)}>
                        +Friend
                      </a>
                    </div>
                  </div>
                    )
                  })
                } 
                  
                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.profile || {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (updatedprofile) => dispatch((updateProfile(updatedprofile)))
}
}

export default connect(mapStateToProps, mapDispatchToProps)(Feeds);
