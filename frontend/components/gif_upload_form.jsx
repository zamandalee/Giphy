import React from 'react';
import axios from 'axios';
import apiConfig from '../../apiKeys';

// Tried to allow users to upload gifs, but consistently encountered a
// 401 unauthorized error, with the message of 'invalid_api_key'.
// However, my API key works for GET requests, and Giphy's public key also
// showed this same error.
// After considerable Googling, I discovered that many users have been stumped
// by this error, and haven't received responses from the Giphy support team:
// https://github.com/Giphy/GiphyAPI/issues/146.
// Nevertheless, I think my logic below is correct, and I'd would love to
// discuss the solution to this error if you're familiar with it!

// I've left this page unstyled, because the POST request wasn't functional.

class GifUploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {source_image_url: "", tags: ""};

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    // upload Gif using API, then route to show page for new gif
    e.preventDefault();

    // let postData = {
    //   api_key: `${apiConfig.giphyKey}`,
    //   source_post_url: 'https://tenor.com/HVQ8.gif',
    //   tags: 'puppy, pokemon'
    // };
    //
    // let options = {
    //   url: 'http://upload.giphy.com/v1/gifs?api_key=' + apiConfig.giphyKey,
    //   formData: postData,
    //   json: true
    // };
    //
    // const request = require('request');
    // const p = new Promise( (resolve, reject) => {
    //   request.post(options, (resp) => {
    //     console.log(resp);
    //   });
    // });
    //
    // return p.then( (r) => console.log(r) );

    const { source_image_url, tags } = this.state;

    axios.post('http://upload.giphy.com/v1/gifs', {
        api_key: `${apiConfig.giphyKey}`,
        source_image_url: source_image_url
    }).then( response => {
      console.log(response);
      // const postedUrl = 'https://media.giphy.com/media/' + response.data.id + '/giphy.gif';
      // this.props.history.push(postedUrl);
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

export default GifUploadForm;
