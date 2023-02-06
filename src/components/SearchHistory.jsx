import React, { useContext } from "react";
import { Button, Menu, MenuItem } from "@material-ui/core";
import "../App.css";
import { Context } from "../context/Context";
import { getFeed } from "./utils/httpRequests";

export default function SearchHistory() {
  const { state, dispatch } = useContext(Context);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    if (event.currentTarget.innerText !== '') 
      fetchFeed({target: {elements: {feed_url: {value: event.currentTarget.innerText}}}});
    setAnchorEl(null);
  };

  const renderItem = (item, i) => {
    return (
      <MenuItem key={i} index={i} onClick={handleClose}>
        {item}
      </MenuItem>
    );
  };

  const renderMenuItems = () => {
    return <div>{state.previousFeeds.map(renderItem)}</div>;
  };

  const fetchFeed = async (event) => {
    dispatch({ type: 'SET_FETCHING',  payload: true });
    try {
      const feed = await getFeed(event);
      dispatch({type: 'SET_CURRENT_FEED', payload: feed});
      dispatch({ type: 'SET_ERROR',  payload: false });
      return
    } catch (error) {
      dispatch({ type: 'SET_ERROR',  payload: true });
      return error;
    } finally {
      dispatch({ type: 'SET_FETCHING',  payload: false });
    }
  }

  return (
    <div style={{ padding: "20px 0" }}>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        color="primary"
        onClick={handleClick}
      >
        Previous Feeds
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {state.previousFeeds ? renderMenuItems() : <div />}
      </Menu>
    </div>
  );
}
