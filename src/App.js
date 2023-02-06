import React, { useEffect, useState } from "react";
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
import FavoriteDialog from "./components/FavoriteDialog";
import { useRef } from "react";
import SearchHistory from "./components/SearchHistory";

const App = ({ fetching }) => {
  const [fetched, setFetched] = useState({});
  const [onFetching, setFetching] = useState(false);
  const [previousFeeds, setPreviousFeeds] = useState([]);
  const [past, setPast] = useState(false);
  const [error, setError] = useState(false);
  const [favoriteFeeds, setFavoriteFeeds] = useState([]);

  const favoritesPopUpRef = useRef();

  const getFeed = (event) => {
    setFetching((prev) => !prev);
    if (event.preventDefault != null)
      event.preventDefault();
    const feed_url = formatUrl(event.target.elements.feed_url.value);
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
            program_link: feed_url,
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

  // Formatting method for URLs to avoid having duplicate favorites in localstorage as the key used is the URL
  const formatUrl = (url) => {
    let urlSequence;
    let finalUrl;
    if (url.includes('://')) {
      urlSequence = url.split('://')[1];
      finalUrl = 'https://' + urlSequence;
    } else {
      finalUrl = 'https://' + url;
    }

    return finalUrl;
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

  const isFavoriteSelected = (link) => {
    return favoriteFeeds.some(el => el.program_link === link);
  }

  const updateFavoritesFeeds = () => {
    let favorites = [];
    for (let [key, value] of Object.entries(localStorage)) {
      if (key.startsWith('favorite-')) {
          favorites.push(JSON.parse(value));
      }
    } 
    setFavoriteFeeds(favorites);
  }

  useEffect(() => {
    updateFavoritesFeeds();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">quick-feed</h1>
      </header>
      <UserForm
        getFeed={getFeed} />
      
      {past ? <>
          <nav className="options-nav">
            <SearchHistory getFeed={getFeed} history={[...previousFeeds]} />
            <div style={{ padding: "20px 0" }}><Button onClick={() => {favoritesPopUpRef.current.handleClickOpen()}}>Favorites Section</Button></div> 
          </nav>
          <EpisodeList
            episodes={fetched.episodes}
            program_title={fetched.program_title}
            program_description={fetched.program_description}
            program_image={fetched.program_image}
            program_link={fetched.program_link}
            isFavoriteSelected={isFavoriteSelected} 
            updateFavorites={updateFavoritesFeeds}
            />
          </> : <p>Please enter an RSS feed</p>}

      {error ? renderAlert() : <div />}
      <LoadingStatus fetching={onFetching} />

      {/* Favorite feeds list dialog component */}
      <FavoriteDialog favoriteFeeds={favoriteFeeds} updateFavorites={updateFavoritesFeeds} getFeed={getFeed} isFavoriteSelected={isFavoriteSelected} ref={favoritesPopUpRef} />
    </div>
  );
};

export default App;
