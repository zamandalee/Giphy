import React from 'react';
import { Link } from 'react-router-dom';

class GifIndex extends React.Component {
  constructor(props) {
    super(props);

    this.gifClickHandler = this.gifClickHandler.bind(this);
  }

  // routes to a new url based on the clicked gif's unique id
  gifClickHandler(e) {
    // const id = e.target.id; //need to store id due to errors w synthetic events
    // this.props.fetchGif(id).then( () => {
      this.props.history.push(`/${e.target.id}`);
    // });
  }

  // componentDidMount() {
  //   this.props.fetchGifs
  //
  //   // need the contionals prob not
  // }

  render() {
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

          <Link to="/">&larr; back to search</Link>
        </div>

        <div className="masonry">
          {gifImgs}
        </div>
      </div>
    );
  }
}


// GifIndex container

import { connect } from 'react-redux';

const mapStateToProps = state => ({
  gifs: state.gifs
});

import { fetchGif } from '../actions/gif_actions';

const mapDispatchToProps = dispatch => ({
  fetchGif: gifId => dispatch(fetchGif(gifId))
});

export default connect(mapStateToProps, mapDispatchToProps)(GifIndex);
