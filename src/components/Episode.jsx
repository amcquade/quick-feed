import React, { Component } from "react";

class Episode extends Component {
  state = {
    episodes: null,
    avatar: null
  };

  createMarkup(h) {
    return { __html: h };
  }

  render() {
    return (
      <div>
        {this.props.title}
        <a href={this.props.link}>{this.props.title}</a>
        <p>{this.props.description}</p>
        <div
          dangerouslySetInnerHTML={this.createMarkup(this.props.enclosure)}
        />
      </div>
    );
  }
}

export default Episode;
