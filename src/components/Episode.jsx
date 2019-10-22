import React, { PureComponent } from "react";

class Episode extends PureComponent {
  divStyles = {
    width: "77vw",
    float: "right",
    "margin-right": "1vw"
  }
  render() {
    return (
      <div class="list-group" style={this.divStyles}>
        <a href={this.props.link} className="list-group-item list-group-item-action text-left">{this.props.title}</a>
      </div>
    );
  }
}

export default Episode;
