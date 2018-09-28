import React from 'react';
import { Link } from 'react-router-dom';

class GifShow extends React.Component {
  constructor(props) {
    super(props);

    console.log(props);
  }

  render() {
    const { selectedGif } = this.props;
    // const importDate = selectedGif.import_datetime.;

    return (
      <div className="back-bttns">
        <Link to="/">
          <img className="logo" src="./assets/logo.png" />
        </Link>

        <Link to="/">&larr; back to search</Link>
      </div>


    );
  }
}


// GifShow container

import { connect } from 'react-redux';
import { fetchGif } from '../actions/gif_actions';

const mapStateToProps = ({ selectedGif }) => ({
  selectedGif
});

const mapDispatchToProps = dispatch => ({
  fetchGif: gifId => dispatch(fetchGif(gifId))
});

export default connect(mapStateToProps, mapDispatchToProps)(GifShow);
