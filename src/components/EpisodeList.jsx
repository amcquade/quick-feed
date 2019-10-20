import React, { Component } from "react";
import Episode from "./Episode";

class EpisodeList extends Component {
  cardStyle = {
    width: "20vw",
    float: "left"
  }
  renderEpisodeList = () => {
    return (
      <div>
        <div className="card" style={this.cardStyle}>
          <img src={this.props.program_image} className="card-img-top" alt={this.props.program_title} />
          <div className="card-body">
            <h5 className="card-title">{this.props.program_title}</h5>
            <div className="card-text" dangerouslySetInnerHTML={{ __html: this.props.program_description }}></div>
          </div>
        </div>
        {this.props.episodes.map(this.returnEpisodes)}
      </div>
    );
  };

  returnEpisodes = (episode, i) => {
    return (
      <Episode
        key={i}
        index={i}
        title={episode.title}
        enclosure={episode.enclosure}
        link={
          episode.enclosure
            ? episode.enclosure.url
            : "json_data is null or undefined"
        }
        image={this.props.program_image}
        description={episode.description}
      />
    );
  };

  render() {
    return (
      <div>{this.props.episodes ? this.renderEpisodeList() : <div />}</div>
    );
  }
}

export default EpisodeList;
