import React from 'react';
import { Link } from 'react-router-dom';

class GifIndex extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  gifClickHandler() {

  }

  render() {
    const gifImgs = this.props.gifs.map( gif => {
      return (
        <img key={gif.id}
          className="gif-img"
          src={gif.images.fixed_width.webp}
          onClick=""/>
      );
    });

    return (
      <div className="gif-index">
        <Link to="/"><img className="logo"
          src="./assets/logo.png" />
        </Link>

        <Link to="/">&larr; back to search</Link>

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

export default connect(mapStateToProps)(GifIndex);
