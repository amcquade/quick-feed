import React, { Component } from "react";

class Episode extends Component {
  render() {
    return (
      <div>
        {this.props.title}
        <a href={this.props.link}>{this.props.title}</a>
        <p>{this.props.description}</p>
      </div>
    );
  }
}

export default Episode;
