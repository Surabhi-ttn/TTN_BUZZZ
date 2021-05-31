import React from "react";
import { connect } from 'react-redux';
import M from 'materialize-css';
import "./createpost.css";

class CreatePost extends React.Component {
  constructor() {
    super()
    this.state = {
      "user_id": "",
      "caption": ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleCreatePost = this.handleCreatePost.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  handleCreatePost(e) {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("user_id", this.props.user.user_id);
    urlencoded.append("caption", this.state.caption);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch("http://localhost:9000/post/createpost", requestOptions)
      .then(response => response.json())
      .then(result => {
        this.setState({
          ...this.state,
          "caption": result.caption
        })
        M.toast({html: 'Post created'})
      })
      .catch(error => console.log('error', error));
  }
  render() {
    return (
      <div className="createpost-container">
        <div className="card createpost-card">
          <div className="row">
            <form className="col form-div">
              <div className="createpost-heading">Create Post</div>
              <div className="createpost-textfield">
                <div className="input-field">
                  <textarea
                    id="caption"
                    className="materialize-textarea"
                    onChange={this.handleChange}
                  ></textarea>
                  <label for="caption">Start a Post...</label>
                </div>
              </div>
              <div className="createpost-photo-div">
                <div class="file-field input-field">
                  <input type="file" multiple />

                  <div class="file-path-wrapper">
                    <input
                      class="file-path validate"
                      placeholder="Add Photo/Video to Your Post"
                    />
                  </div>
                </div>
              </div>
              
                <button className="createpost-btn" onClick={(e) => this.handleCreatePost(e)}>Post</button>
            
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
   user: state || {}
  }
}

export default connect(mapStateToProps)(CreatePost);
