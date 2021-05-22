import React from "react";
import "./feeds.css";
import banner from "./bg.jpg";
import profile from "../profile/surabhi.jpg";
import Header from "../header/header";
import CreatePost from "./createpost";

class Feeds extends React.Component {
  render() {
    return (
      <div className="feeds-container">
        <Header />
        <div className="row">
          <div className="col">
            <div className="row">
              <div className="card card1">
                <div className="cover-banner">
                  <img className="banner" src={banner} alt="banner" />
                  <div className="profile">
                    <img
                      className="profile-pic circle"
                      src={profile}
                      alt="profile-pic"
                    />
                  </div>
                </div>
                <div className="profile-name">
                  <span className="name">Name</span>
                  <p>Designation</p>
                </div>
                <div className="row profile-description">
                  <div className="col des">friend count</div>
                  <div className="col">post count</div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="card card2">
                <div className="row">
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
                <div className="row">
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
                <div className="row">
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
              <div className="card card3">
                <div className="pic-div">
                  <img src={profile} className="circle pic" alt="profile" />
                </div>
                <div className="create-post"></div>
                <div className="photo-div">
                  <i className="fas fa-images photo-upload">
                    <span className="photo-upload-text">Photo/Video</span>
                  </i>
                </div>
              </div>
            </div>
            <div className="row"></div>
          </div>
          <div className="col">
            <div className="row">
              <div className="card card4">
                <div className="row s-heading">
                  <div className="heading">Contacts</div>
                  <div>
                    <i className="material-icons">search</i>
                  </div>
                </div>
                <div className="row">
                  <div className="suggestion-profile">
                    <div className="s-img">
                      <img src="" className="circle s-profile" />
                    </div>
                    <div className="s-name">Name</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="card card4">
                <div className="row s-heading">
                  <div className="heading">Suggestions</div>
                  <div>
                    <i className="material-icons">search</i>
                  </div>
                </div>
                <div className="row">
                  <div className="suggestion-profile">
                    <div className="s-img">
                      <img src="" className="circle s-profile" />
                    </div>
                    <div className="s-name">Name</div>
                    <div className="add">
                      <a className="add-friend" href="#">
                        +Friend
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Feeds;
