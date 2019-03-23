import React, { Component } from "react";
import Episode from "./Episode";
import UserForm from "./UserForm";
import logo from "../logo.svg";
import AlertDialog from "./AlertDialog";

class EpisodeList extends Component {
  state = {
    episodes: null,
    program_image: null,
    fetching: false,
    program_title: null,
    program_description: null
  };

  renderEpisodes = () => {
    return (
      <div>
        <h1>
          {this.state.program_title} by {this.state.creator}
        </h1>
        <img src={this.state.program_image} />
        <p>{this.state.program_description}</p>
        {this.state.episodes.map(this.returnEpisodes)}
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
        image={this.state.program_image}
        description={episode.description}
      />
    );
  };

  getFeed = e => {
    this.setState({ fetching: !this.state.fetching });
    e.preventDefault();
    const feed_url = e.target.elements.feed_url.value;
    let Parser = require("rss-parser");
    let parser = new Parser({
      customFields: {
        item: [["enclosure", { keepArray: true }]]
      }
    });
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

    if (feed_url) {
      var arr = [];
      // parser.parseURL(CORS_PROXY + feed_url, function(err, feed) {

      //   feed.items.forEach(function(entry) {
      //     arr.push(entry);
      //   });
      // });
      // console.log(arr);
      // this.setState({
      //   episodes: arr,
      //   program_title: "feed.title",
      //   fetching: !this.state.fetching,
      //   program_image: "feed.image.url",
      //   program_description: "feed.description"
      // });
      (async () => {
        try {
          let feed = await parser.parseURL(CORS_PROXY + feed_url);
          let arr = [];
          console.log("feed: " + feed);
          feed.items.forEach(item => {
            arr.push(item);
          });
          this.setState({
            episodes: arr,
            program_title: feed.title,
            fetching: !this.state.fetching,
            program_image: feed.image.url,
            program_description: feed.description
          });
        } catch (err) {
          console.log(err);
        }
      })();
    } else {
      return;
    }
  };

  render() {
    return (
      <div>
        <UserForm getFeed={this.getFeed} />
        {this.state.episodes ? (
          this.renderEpisodes()
        ) : (
          <div>
            {!this.state.fetching ? (
              <p>Please enter an RSS feed</p>
            ) : (
              <div>
                <img src={logo} className="App-logo" />
                {!this.state.error ? <AlertDialog /> : <div />}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default EpisodeList;
