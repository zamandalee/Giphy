import React from 'react';
import axios from 'axios';
import apiConfig from '../../apiKeys';

class GifUploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: "", source_image_url: "", tags: ""};
  }

  handleSubmit(e) {
    // upload Gif using API, then route to show page for new gif
    e.preventDefault();

    const { username, source_image_url, tags } = this.state;

    axios.post('http://api.giphy.com/upload.giphy.com/v1/gifs', {
      params: {
        api_key: `${apiConfig.giphyKey}`,
        username,
        source_image_url,
        tags
      }
    }).then( response => {
      console.log(response);
      // this.props.history.push(`/gif/${response.response_id}`);
    });
  }

  update(field) {
    return e => {
      this.setState({[field]: e.target.value});
    };
  }

  render() {
    return (
      <div className="gif-upload">
        <form onSubmit={this.handleSubmit}>
          <h2>Upload a gif!</h2>

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
    );
  }
}


import { connect } from 'react-redux';
import { fetchGif } from '../actions/gif_actions';

const mapDispatchToProps = dispatch => ({
  fetchGif: gif_id => dispatch(fetchGif(gif_id))
});

export default connect(null, mapDispatchToProps)(GifUploadForm);
