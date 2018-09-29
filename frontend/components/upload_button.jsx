import React from 'react';

class UploadButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: "", source_image_url: "", tags: ""};

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // show modal
  }

  handleSubmit(e) {
    e.preventDefault();

    const { username, source_image_url, tags } = this.state;
    this.props.uploadGif(username, source_image_url, tags).then( response => {
      this.props.history.push(`/gif/${response.response_id}`);
    });
  }

  render() {
    return (
      <div>
        <button className="initial-upload-bttn"
          onClick={this.handleClick}>
          Upload Gif
        </button>

        <div className="modal-container">
          <div className="modal">
            <form onSubmit={this.handleSubmit}>
              <h2>Upload a Gif!</h2>

              <input className="upload-input"
                onChange={this.update("username")}
                placeholder="username (opt)" />
              <input className="upload-input"
                onChange={this.update("source_image_url")}
                placeholder="source url (*)"
                required/>
              <input className="upload-input"
                onChange={this.update("tags")}
                placeholder="tags (opt, ie.: 'puppy, cute')" />

              <button>Upload</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}


import { connect } from 'react-redux';
import { apiUploadGif, fetchGif } from '../actions/gif_actions';

const mapDispatchToProps = dispatch => ({
  uploadGif: (username, source_image_url, tags) => dispatch(apiUploadGif(username, source_image_url, tags)),
  fetchGif: gif_id => dispatch(fetchGif(gif_id))
});
