import React, { Component } from "react";

class SearchHistory extends Component {
  divStyles = {
    width: "77vw",
    float: "right",
    marginRight: "1vw"
  };

  render() {
    return (
      <ul>
        {this.props.history.map(function(feed, i) {
          return (
            <li key={i} index={i}>
              {feed}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default SearchHistory;
