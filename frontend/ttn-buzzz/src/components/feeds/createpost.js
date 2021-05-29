import React from "react";
import "./createpost.css";

const CreatePost = () => {


  function handleCreatePost(e) {
    e.preventDefault()
    console.log(e);
  }
  
    return (
      <div className="createpost-container">
        <div className="card createpost-card">
          <div className="row">
            <form className="col form-div" onSubmit={(e) => handleCreatePost(e)}>
              <div className="createpost-heading">Create Post</div>
              <div className="createpost-textfield">
                <div className="input-field">
                  <textarea
                    id="textarea2"
                    className="materialize-textarea"
                  ></textarea>
                  <label for="textarea2">Start a Post...</label>
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
              
                <button className="createpost-btn">Post</button>
            
            </form>
          </div>
        </div>
      </div>
    );
  }

export default CreatePost;
