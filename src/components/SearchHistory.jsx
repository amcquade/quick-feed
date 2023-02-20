import React from "react";
import { Button, Menu, MenuItem } from "@material-ui/core";
import "../App.css";

function SearchHistory({getFeed, history}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    if (event.currentTarget.innerText != '') 
      getFeed({target: {elements: {feed_url: {value: event.currentTarget.innerText}}}});
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
    return <div>{history.map(renderItem)}</div>;
  };

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
        {history ? renderMenuItems() : <div />}
      </Menu>
    </div>
  );
}

export default SearchHistory;
