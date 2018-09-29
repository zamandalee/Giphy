import React from 'react';

class SearchSplash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {query: ""};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    // auto-focuses the input search bar
    this.titleInput.focus();
  }

  // fetches gifs matching the query using the Giphy Search API, see gif_actions
  // pushes to a new url to show the GifIndex
  handleSubmit(e) {
    e.preventDefault();
    this.props.fetchGifs(this.state.query).then( () => {
      this.props.history.push('/gifs');
    });
  }

  update(e) {
    this.setState({query: e.target.value});
  }

  render() {
    return (
      <div className="splash">
        <img src="./assets/logo.gif" />

        <form onSubmit={this.handleSubmit}>
          <input type="text"
            className="search-input"
            onChange={this.update}
            value={this.state.query}
            placeholder="Search for GIFs!"
            ref={(input) => { this.titleInput = input; }}/>

          <button className="search-bttn" disabled={!this.state.query}>Search</button>
        </form>
      </div>
    );
  }
}

// SearchSplash container

import { connect } from 'react-redux';
import { fetchGifs } from '../actions/gif_actions';

const mapDispatchToProps = dispatch => ({
  fetchGifs: query => dispatch(fetchGifs(query))
});

export default connect(null, mapDispatchToProps)(SearchSplash);
