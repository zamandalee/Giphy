import React from 'react';
import { Link } from 'react-router-dom';

class GifShow extends React.Component {
  constructor(props) {
    super(props);
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
            <button className="share-bttn">Share on Slack</button>
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
  fetchGif: gifId => dispatch(fetchGif(gifId))
});

export default connect(mapStateToProps, mapDispatchToProps)(GifShow);
