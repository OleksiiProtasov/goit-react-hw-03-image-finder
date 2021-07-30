import React, { Component } from "react";

class SearchForm extends Component {
  state = { query: "" };

  handleChange = (e) => {
    this.setState({ query: e.currentTarget.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.onSubmit(this.state.query);
    this.setState({ query: "" });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm">
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
      //   <form onSubmit={this.handleSubmit}>
      //     <input
      //       type="text"
      //       value={this.state.query}
      //       onChange={this.handleChange}
      //     />
      //     <button type="submit">Искать</button>
      //   </form>
    );
  }
}

export default SearchForm;
