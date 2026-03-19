import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
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
  const [searchResults, setSearchResults] = useState([]);
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);

  const fetchRSS = async (url) => {
    setFetching(true);
    const Parser = require("rss-parser");
    const parser = new Parser({
      customFields: {
        item: [["enclosure", { keepArray: true }]],
      },
    });

    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

    try {
      const feed = await parser.parseURL(CORS_PROXY + url);
      setFetched({
        episodes: feed.items,
        program_title: feed.title,
        program_image: feed.image.url,
        program_description: feed.description,
      });
      setFetching(false);
      setPreviousFeeds((prev) => [...new Set([...prev, url])]);
      setPast(true);

      return setError(false);
    } catch (err) {
      setFetching(false);
      setError(true);

      return err;
    }
  };

  const getFeed = async (event) => {
    if (event && event.preventDefault != null) {
      event.preventDefault();
    }
    const target = event && event.target;
    const elements = target && target.elements;
    const feed_url_elem = elements && elements.feed_url;
    let input_val = feed_url_elem && feed_url_elem.value;
    input_val = input_val ? input_val.trim() : "";

    if (!input_val) return;

    const isUrl = input_val.startsWith("http://") || input_val.startsWith("https://") || input_val.includes(".xml") || input_val.includes(".rss");

    if (isUrl) {
      return fetchRSS(input_val);
    } else {
      setFetching(true);
      try {
        const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(input_val)}&entity=podcast`);
        const data = await res.json();
        
        if (data.results && data.results.length > 0) {
          const exactMatch = data.results.find(p => p.collectionName.toLowerCase() === input_val.toLowerCase());
          if (exactMatch && exactMatch.feedUrl) {
            setFetching(false);
            return fetchRSS(exactMatch.feedUrl);
          } else {
            setSearchResults(data.results.filter(p => p.feedUrl));
            setSearchDialogOpen(true);
            setFetching(false);
          }
        } else {
          setFetching(false);
          setError(true);
        }
      } catch (err) {
        setFetching(false);
        setError(true);
      }
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

  const renderSearchDialog = () => (
    <Dialog open={searchDialogOpen} onClose={() => setSearchDialogOpen(false)} maxWidth="sm" fullWidth>
      <DialogTitle>Select a Podcast</DialogTitle>
      <DialogContent>
        <List>
          {searchResults.map((result) => (
            <ListItem 
              button 
              key={result.collectionId} 
              onClick={() => {
                setSearchDialogOpen(false);
                fetchRSS(result.feedUrl);
              }}
            >
              <ListItemAvatar>
                <Avatar src={result.artworkUrl60} />
              </ListItemAvatar>
              <ListItemText 
                primary={result.collectionName} 
                secondary={result.artistName} 
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setSearchDialogOpen(false)} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
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
      {searchDialogOpen ? renderSearchDialog() : null}
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
