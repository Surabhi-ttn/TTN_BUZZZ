import React from "react";
import logo from "../auth/logo.jpeg";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import {updateProfile} from '../../actions/action'
import "./header.css";
import M from 'materialize-css';
import $ from 'jquery'

class Header extends React.Component {

  constructor () {
    super()
    this.state = {
      pendingRequestList: []
    }
  }

  redirectToProfile(user_id) {
    this.props.history.push(`/viewprofile/${user_id}`)
  }

  handlependingrequestlist() {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(`http://localhost:9000/user/getpendingrequest?user_id=${this.props.user.user_id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        this.setState({
        ...this.state,
        pendingRequestList: result.pendingfriendrequest
      })
    })
      .catch(error => console.log('error', error));
  }
     
    componentDidMount() {
      
    }

    toggleModal () {
      var instance = M.Modal.getInstance($("#modal1"));
      instance.open();
    }

    redirectToProfile(user_id) {
      this.props.history.push('/updateprofile')
   }

    handleAcceptRequest (friend_id){
      
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("user_id", this.props.user.user_id);
      urlencoded.append("friend_id", friend_id );

      var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
      };

      fetch("http://localhost:9000/user/acceptrequest", requestOptions)
      .then(response => response.json())
      .then(result => {
        this.props.updateProfile(result.data)
        let newrequestlist = this.state.pendingRequestList.filter(request => request.user_id!=friend_id)
        this.setState({
          ...this.state,
          pendingRequestList: newrequestlist
        })
      })
      .catch(error => console.log('error', error));
    }

    handleRejectRequest (friend_id) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("user_id", this.props.user.user_id);
      urlencoded.append("friend_id", friend_id );

      var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
      };

      fetch("http://localhost:9000/user/deleterequest", requestOptions)
      .then(response => response.json())
      .then(result => {
        this.props.updateProfile(result.data)
        let newrequestlist = this.state.pendingRequestList.filter(request => request.user_id!=friend_id)
        this.setState({
          ...this.state,
          pendingRequestList: newrequestlist
        })
      })
      .catch(error => console.log('error', error));
    }

    render(){
    return (
      <div className="header navbar-fixed">
        <nav className="navbar">
          <div className="nav-wrapper">
            <a href="#" className="brand-logo">
              <img src={logo} className="logo" alt="logo" />
            </a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
              <li>
                <img src={this.props.user.profile_pic} className="header-profile circle" alt="logo" />
              </li>
              <li>
                <span className="p-name" onClick={(e) => this.redirectToProfile(this.props.user.user_id)}>{this.props.user.first_name + " " + this.props.user.last_name}</span>
              </li>
              
              <li>
                <a href="#">
                  <i className="fab fa-facebook-messenger circle notification-icon"></i>
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => {this.handlependingrequestlist(); this.toggleModal()}}>
                  <i className="material-icons circle notification-icon">person</i>
                </a>
                <div id="modal1" class="modal request-modal">
                  <div class="modal-content">
                    <h5 style={{color:"black"}}>Friend Requests</h5>
                    {
                      this.state.pendingRequestList.map(pendingRequest => {
                        return (
                          <div className="friend-profile" >
                    <div className="friend-img">
                      <img src={pendingRequest.profile_pic} className="circle f-profile" alt="friend-img"/>
                    </div>
                    <div className="f-name" onClick={(e) => this.redirectToProfile(pendingRequest.user_id)}>{pendingRequest.first_name + " " + pendingRequest.last_name}</div>
                    <div className="accept-reject">
                      <a className="accept btn" href="#" onClick={(e) => this.handleAcceptRequest(pendingRequest.user_id)}>
                        Accept
                      </a>
                      <a className="reject btn" href="#" onClick={(e) => this.handleRejectRequest(pendingRequest.user_id)}>
                        Reject
                      </a>
                    </div>
                  </div>
                        )
                      })
                    }
                  </div>
                  <div class="modal-footer">
                    <a href="#" class="modal-close waves-effect waves-green btn-flat">Close</a>
                  </div>
                </div>
              </li>
              
              <li>
                <a href="#">
                <a className="btn logout-btn">Logout</a>
                </a>
              </li>
            </ul>
          </div>
        </nav>
        
      </div>
    );
    }
  }

  const mapStateToProps = (state) => {
    return {
      user: state || {}
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      updateProfile: (updatedprofile) => dispatch((updateProfile(updatedprofile)))
  }
  }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
