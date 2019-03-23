import React, { Component } from "react";
import "./App.css";
import EpisodeList from "./components/EpisodeList";
import Episode from "./components/Episode";

//https://api.github.com/users/amcquade

class App extends Component {
  state = {
    episodes: null,
    avatar: null
  };

  getFeed = e => {
    e.preventDefault();
    const user = e.target.elements.feed_url.value;
    let Parser = require("rss-parser");
    let parser = new Parser();
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

    if (user) {
      (async () => {
        let feed = await parser.parseURL(
          CORS_PROXY + "https://www.reddit.com/.rss"
        );
        console.log(feed.title);

        feed.items.forEach(item => {
          console.log(item.title + ":" + item.link);
        });
      })();
      // let feed = parser.parseURL("https://www.reddit.com/.rss");
      // console.log(feed.title);

      // feed.items.forEach(item => {
      //   console.log(item.title + ":" + item.link);
      // });
      // axios.get(`https://api.github.com/users/${user}`).then(res => {
      //   console.log(res);
      //   const repos = res.data.public_repos;

      //   // ui updates here
      //   this.setState({
      //     repos: res.data.public_repos,
      //     avatar: res.data.avatar_url
      //   });

      //   // short hand of code above bc our const and state have the same name
      //   // this.setState({ repos });
      // });
    } else {
      return;
    }
  };

  returnEpisodes = (episode, i) => {
    return <Episode key={i} index={i} episode={episode} />;
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">quick-feed</h1>
        </header>
        <EpisodeList />
      </div>
    );
  }
}

export default App;
