import React, { Component } from "react";
import "./Searchbar.css";
export default class Searchbar extends Component {
  constructor() {
    super();
    this.state = {
      suggestions: [],
      value: "",
      clicked: false,
    };
  }

  onTextChanged = (event) => {
    let value = event.target.value,
      suggestions = [],
      { titles } = this.props;

    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = titles.sort().filter((item) => regex.test(item.title));
    }
    this.setState({
      suggestions: suggestions,
      value: value,
      clicked: false,
    });
    if (value.length === 0) {
      this.props.showTodo("All");
      return;
    }
  };
  suggestionClicked = (item) => {
    this.setState({
      value: item.title,
      clicked: true,
    });
    this.props.showSearchTodo(item);
  };
  showSuggestions = () => {
    let { suggestions } = this.state;

    if (suggestions.length === 0) return null;
    return (
      <ul style={{ display: this.state.clicked ? "none" : "" }}>
        {suggestions.map((item) => (
          <div>
            <li
              onClick={() => this.suggestionClicked(item)}
              className="suggestions"
            >
              <span>{item.title}</span>
            </li>
          </div>
        ))}
      </ul>
    );
  };
  render() {
    return (
      <div className="search-bar">
        <form onClick={(event) => event.preventDefault()}>
          <input
            type="input"
            value={this.state.value}
            onChange={this.onTextChanged}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                console.log(event.target.value);
              }
            }}
            placeholder="Search"
            aria-label="Search"
          />
          {this.showSuggestions()}
        </form>
      </div>
    );
  }
}
