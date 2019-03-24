import React, { Component } from "react";
import Episode from "./Episode";

class EpisodeList extends Component {
  renderEpisodeList = () => {
    return (
      <div>
        <h1>
          {this.props.program_title} by {this.props.creator}
        </h1>
        <img src={this.props.program_image} />
        <p>{this.props.program_description}</p>
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
