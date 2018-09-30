/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
// import InfiniteScroll from 'react-infinite-scroller';

class GifIndex extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { numLoaded: 0 }; // this was for the infinite scroll
    this.gifClickHandler = this.gifClickHandler.bind(this);
  }

  // fetch gifs that match the query string from Giphy Search API
  // 700ms delay to display loading icon
  componentDidMount() {
    const { fetchGifs } = this.props;
    const { query } = this.props.match.params;

    window.setTimeout( () => { fetchGifs(query) }, 700 );
  }

  // upon click, routes to a new url determined by the clicked gif's unique id
  gifClickHandler(e) {
    this.props.history.push(`/gif/${e.target.id}`);
  }

  render() {
    // return loading gif if fetchGifs has not completed and props.gifs doesn't exist yet
    const loader = <img className="loader" src="./assets/loader.gif" />

    if(this.props.gifs === undefined) {
      return (
        loader
      );
    }

    // when fetchGifs completes, component will re-render
    // return images of the 'fixed width' version of all fetched gifs
    let gifImgs = Object.values(this.props.gifs).map( gif => {
      return (
        <img key={gif.id}
          className="gif-img"
          src={gif.images.fixed_width.webp}
          id={gif.id}
          onClick={this.gifClickHandler}/>
      );
    });

    // if no gifs match the query, return no matches message
    if (gifImgs.length === 0) {
      gifImgs = <p className="no-match">no gifs match your search</p>;
    }

    return (
      <div className="gif-index">
        <div className="back-bttns">
          <Link className="logo" to="/">
            <img src="./assets/logo.png" />
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

// I got started on the infinite scroll feature, but didn't finish.
// I'd love to come back to work on it, though!

// <InfiniteScroll
//   pageStart={0}
//   threshold={100}
//   loadMore={this.loadGifs.bind(this)}
//   hasMore={this.state.numLoaded <= 25}
//   loader={loader}>
//
//   <div className="masonry">
//     {gifImgs}
//   </div>
// </InfiniteScroll>

// window.setTimeout( () => {
//   fetchGifs(query, offset).then(
//     () => this.setState({
//       numLoaded: this.state.numLoaded += Object.keys(this.props.gifs).length
//     })
//   );
// }, 700 );

// GifIndex container

import { connect } from 'react-redux';
import { fetchGif, fetchGifs } from '../actions/gif_actions';

const mapStateToProps = state => ({
  gifs: state.gifs
});

const mapDispatchToProps = dispatch => ({
  fetchGif: gifId => dispatch(fetchGif(gifId)),
  fetchGifs: (query, offset) => dispatch(fetchGifs(query, offset))
});

export default connect(mapStateToProps, mapDispatchToProps)(GifIndex);
