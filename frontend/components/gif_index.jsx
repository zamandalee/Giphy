import React from 'react';
import { Link } from 'react-router-dom';

class GifIndex extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.gifClickHandler = this.gifClickHandler.bind(this);
  }

  gifClickHandler(e) {
    this.props.history.push(`/${e.target.id}`);
  }

  render() {
    const gifImgs = this.props.gifs.map( gif => {
      return (
        <img key={gif.id}
          className="gif-img"
          src={gif.images.fixed_width.webp}
          data-id={gif.id}
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

export default connect(mapStateToProps)(GifIndex);
