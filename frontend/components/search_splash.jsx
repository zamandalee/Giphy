import React from 'react';

class SearchSplash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {query: ""};

    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUploadClick = this.handleUploadClick.bind(this);
  }

  componentDidMount() {
    // auto-focuses the input search bar
    this.titleInput.focus();
  }

  // routes to a new url to show the GifIndex, also passes the query str data
  handleSubmit(e) {
    e.preventDefault();
    this.props.history.push(`/search/${this.state.query}`);
  }

  handleUploadClick() {
    this.props.history.push('/upload');
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
              placeholder="Search for gifs!"
              ref={(input) => { this.titleInput = input; }}/>

            <button className="search-bttn" disabled={!this.state.query}>Search</button>
          </form>
        </div>
    );
  }

  // from attempted upload
  // <button className="initial-upload-bttn"
  //   onClick={this.handleUploadClick}>
  //   Upload Gif
  // </button>

}

export default SearchSplash;
