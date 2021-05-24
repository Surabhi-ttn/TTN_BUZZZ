import React from "react";
import "./createpost.css";

const CreatePost = () => {
  
    return (
      <div className="createpost-container">
        <div className="card createpost-card">
          <div className="row">
            <form className="col">
              <div className="row createpost-heading">Create Post</div>
              <div className="row createpost-textfield">
                <div className="input-field">
                  <textarea
                    id="textarea2"
                    className="materialize-textarea"
                  ></textarea>
                  <label for="textarea2">Start a Post...</label>
                </div>
              </div>
              <div className="row createpost-photo-div">
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
              <div className="row">
                <button className="createpost-btn">Post</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

export default CreatePost;
