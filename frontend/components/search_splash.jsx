import React from 'react';

class SearchSplash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {query: ""}; // so can't press enter on a blank search
    console.log(this.props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    // API call
    e.preventDefault();
    this.props.processForm(this.state).then( () => {
      this.props.history.push('/workspace');
    });
  }

  componentDidMount() {
    // auto-focuses the input search bar
    this.titleInput.focus();
  }

  changeHandler() {
    // setState
  }

  render() {
    // onChange, setState(e.target.value), forms and login
    return (
      <div className="splash">
        <iframe src="https://giphy.com/embed/3o6gbbuLW76jkt8vIc" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

        <form onSubmit={this.handleSubmit}>
          <input type="text"
            className="search-input"
            onChange={this.update}
            value={this.state.query}
            placeholder="Search for gifs"
            ref={(input) => { this.titleInput = input; }}/>

          <button className="search-bttn" disabled={!this.state.query}>Search</button>
        </form>
      </div>
    );
  }
}


import { connect } from 'react-redux';
import { fetchGifs } from '../actions/gif_actions';

const mapDispatchToProps = dispatch => ({
  fetchGifs: query => dispatch(fetchGifs(query))
});

export default connect(null, mapDispatchToProps)(SearchSplash);
