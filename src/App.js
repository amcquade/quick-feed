import React, { Component } from "react";
import "./App.css";
import EpisodeList from "./components/EpisodeList";
import UserForm from "./components/UserForm";
import logo from "./logo.svg";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";

class App extends Component {
  state = {
    episodes: null,
    fetching: false,
    program_title: null,
    program_description: null,
    program_image: null
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
      (async () => {
        try {
          let feed = await parser.parseURL(CORS_PROXY + feed_url);
          console.log("feed: " + JSON.stringify(feed, null, 4));
          this.setState({
            episodes: feed.items,
            program_title: feed.title,
            fetching: !this.state.fetching,
            program_image: feed.image.url,
            program_description: feed.description,
            error: false
          });
        } catch (err) {
          console.log(err);
          this.setState({ error: true, fetching: false });
        }
      })();
    } else {
      return;
    }
  };

  handleClose = () => {
    this.setState({
      error: false,
      fetching: false
    });
  };

  renderAlert = () => {
    return (
      <div>
        <Dialog
          open={this.state.error}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Error Parsing Feed</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please try retyping your RSS feed, or try a new one.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">quick-feed</h1>
        </header>
        <UserForm
          getFeed={this.getFeed}
          onClick={() => this.setState({ fetching: true })}
        />
        {this.state.error ? this.renderAlert() : <div />}
        {!this.state.fetching ? (
          <p>Please enter an RSS feed</p>
        ) : (
          <div>
            <img src={logo} className="App-logo" alt="App Logo" />
          </div>
        )}
        <EpisodeList
          episodes={this.state.episodes}
          program_title={this.state.program_title}
          program_description={this.state.program_description}
          program_image={this.state.program_image}
          fetching={this.props.fetching}
        />
      </div>
    );
  }
}

export default App;
