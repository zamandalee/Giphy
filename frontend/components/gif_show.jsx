import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class GifShow extends React.Component {
  constructor(props) {
    super(props);
    this.slackShareGif = this.slackShareGif.bind(this);
  }

  // if selectedGif can't be found (which is the case for a page reload),
  // fetch this single gif again
  componentDidMount() {
    if (this.props.selectedGif === undefined) {
      this.props.fetchGif(this.props.match.params.gif_id);
    }
  }

  handleBackClick() {
    window.history.back();
  }

  // share to Slack functionality using a webhook
  // render a green checkmark upon successful sharing
  // https://api.slack.com/docs/message-attachments#attachment_structure
  slackShareGif() {
    const options = {
        attachments: [
            {
                pretext: "Hey everyone, check out this awesome gif!",
                title: `${this.props.selectedGif.title}`,
                image_url: `${this.props.selectedGif.images.downsized_large.url}`,
                color: "#4dbaf9"
            }
        ]
    };
    axios.post('https://hooks.slack.com/services/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', JSON.stringify(options))
    .then((response) => {
      document.getElementById("check").className = "check";
    });
  }

  render() {
    const { selectedGif } = this.props;

    // if render is attempted before fetchGif is complete
    if (selectedGif === undefined) {
      return "";
    }

    const title = `"${selectedGif.title}"`;
    const gifUrl = selectedGif.images.downsized_large.url;
    const user = selectedGif.username || "unknown user";
    const importDate = selectedGif.import_datetime.slice(0,10);
    const rating = selectedGif.rating.toUpperCase();

    return (
      <div className="gif-show">
        <div className="back-bttns">
          <Link className="logo" to="/">
            <img src="./assets/logo.png" />
          </Link>

          <button className="back-to-search" onClick={this.handleBackClick}>&larr; back to gifs</button>
        </div>

        <h2>{title}</h2>
        <div className="gif-show-contents">
          <div>
            <a href={selectedGif.bitly_url}>
              <img className="gif-show-img" src={gifUrl} />
            </a>
          </div>

          <div className="gif-show-details">
            <p>User: {user}</p>
            <p>Date uploaded: {importDate}</p>
            <p>Rating: {rating}</p>
            <div className="share">
              <button className="share-bttn" onClick={this.slackShareGif}>Share on Slack</button>
              <span id="check" className="hidden">&#10003;</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


// GifShow container

import { connect } from 'react-redux';
import { fetchGif } from '../actions/gif_actions';

// if state.gifs doesn't exist (in the case of a page reload), set selectedGif to be undefined
const mapStateToProps = (state, ownProps) => {
  const selectedGif = state.gifs === undefined ? undefined : state.gifs[ownProps.match.params.gif_id];
  return {
    selectedGif
  };
};

const mapDispatchToProps = dispatch => ({
  fetchGif: gifId => dispatch(fetchGif(gifId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GifShow);
