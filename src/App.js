import React, { useContext } from "react";
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
import { Context } from "./context/Context";

const App = () => {
  const { state, dispatch } = useContext(Context);

  const favoritesPopUpRef = useRef();

  // Check if the current feed is filled.
  const isCurrentFeedFetched = () => {
    return state.currentFeed.program_link && state.currentFeed.program_link !== '';
  }

  const handleClose = () => {
    dispatch({ type: 'SET_FETCHING',  payload: false });
    dispatch({ type: 'SET_ERROR',  payload: false });
  };

  const renderAlert = () => (
    <div>
      <Dialog
        open={state.error}
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
      <UserForm />
      
      {isCurrentFeedFetched() ? <>
          <nav className="options-nav">
            <SearchHistory />
            <div style={{ padding: "20px 0" }}><Button onClick={() => {favoritesPopUpRef.current.handleClickOpen()}}>Favorites Section</Button></div> 
          </nav>
          <EpisodeList
            episodes={state.currentFeed.episodes}
            program_title={state.currentFeed.program_title}
            program_description={state.currentFeed.program_description}
            program_image={state.currentFeed.program_image}
            program_link={state.currentFeed.program_link}
            />
          </> : <p>Please enter an RSS feed</p>}

      {state.error ? renderAlert() : <div />}
      <LoadingStatus fetching={state.onFetching} />

      {/* Favorite feeds list dialog component */}
      <FavoriteDialog ref={favoritesPopUpRef} />
    </div>
  );
};

export default App;
