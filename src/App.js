import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

import "./App.css";
import EpisodeList from "./components/EpisodeList";
import UserForm from "./components/UserForm";
import LoadingStatus from "./components/LoadingStatus";

const App = ({ fetching }) => {
  const [fetched, setFetched] = useState({});
  const [onFetching, setFetching] = useState(false);
  const [previousFeeds, setPreviousFeeds] = useState([]);
  const [past, setPast] = useState(false);
  const [error, setError] = useState(false);

  const getFeed = (event) => {
    setFetching((prev) => !prev);
    if (event.preventDefault != null)
      event.preventDefault();
    const feed_url = event.target.elements.feed_url.value;
    const Parser = require("rss-parser");
    const parser = new Parser({
      customFields: {
        item: [["enclosure", { keepArray: true }]],
      },
    });

    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

    if (feed_url) {
      const loadRSS = async () => {
        try {
          const feed = await parser.parseURL(CORS_PROXY + feed_url);
          setFetched({
            episodes: feed.items,
            program_title: feed.title,
            program_image: feed.image.url,
            program_description: feed.description,
          });
          setFetching((prev) => !prev);
          setPreviousFeeds([...new Set([...previousFeeds, feed_url])]);
          setPast(true);

          return setError(false);
        } catch (error) {
          setFetching(false);
          setError(true);

          return error;
        }
      };

      return loadRSS();
    } else {
      return;
    }
  };

  const handleClose = () => {
    setFetching(false);
    setError(false);
  };

  const renderAlert = () => (
    <div>
      <Dialog
        open={error}
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
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">quick-feed</h1>
      </header>
      <UserForm
        getFeed={getFeed}
        onClick={() => setFetching(true)}
        past={past}
        previous_feeds={[...previousFeeds]}
      />
      {error ? renderAlert() : <div />}
      {!past ? <p>Please enter an RSS feed</p> : <div></div>}
      <LoadingStatus fetching={onFetching} />

      <EpisodeList
        episodes={fetched.episodes}
        program_title={fetched.program_title}
        program_description={fetched.program_description}
        program_image={fetched.program_image}
        fetching={fetching}
      />
    </div>
  );
};

export default App;
