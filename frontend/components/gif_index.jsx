import React from 'react';

class GifIndex extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  logoClickHandler() {

  }

  backClickHandler() {

  }

  imgClickHandler() {

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
        <img className="logo" src="./assets/logo.png" />

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
