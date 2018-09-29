import React from 'react';
import { Link } from 'react-router-dom';

class GifIndex extends React.Component {
  constructor(props) {
    super(props);
    this.gifClickHandler = this.gifClickHandler.bind(this);
  }

  // upon click, routes to a new url determined by the clicked gif's unique id
  gifClickHandler(e) {
      this.props.history.push(`/gif/${e.target.id}`);
  }

  // fetch gifs that match the query string from Giphy Search API
  componentDidMount() {
    this.props.fetchGifs(this.props.match.params.query);
  }

  render() {
    // return early if fetchGifs has not completed and props.gifs doesn't exist yet
    if(this.props.gifs === undefined) {
      return "";
    }

    // when fetchGifs completes, component will re-render
    // return images of the 'fixed width' version of all fetched gifs
    const gifImgs = Object.values(this.props.gifs).map( gif => {
      return (
        <img key={gif.id}
          className="gif-img"
          src={gif.images.fixed_width.webp}
          id={gif.id}
          onClick={this.gifClickHandler}/>
      );
    });

    return (
      <div className="gif-index">
        <div className="back-bttns">
          <Link to="/">
            <img className="logo" src="./assets/logo.png" />
          </Link>

          <Link className="back-to-search" to="/">&larr; back to search</Link>
        </div>

        <h2 className="query">"{this.props.match.params.query}"</h2>
        <div className="masonry">
          {gifImgs}
        </div>
      </div>
    );
  }
}


// GifIndex container

import { connect } from 'react-redux';
import { fetchGif, fetchGifs } from '../actions/gif_actions';

const mapStateToProps = state => ({
  gifs: state.gifs
});

const mapDispatchToProps = dispatch => ({
  fetchGif: gifId => dispatch(fetchGif(gifId)),
  fetchGifs: query => dispatch(fetchGifs(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(GifIndex);
