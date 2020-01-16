import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import "../App.css";
export default function SearchHistory(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderItem = (item, i) => {
    return (
      <MenuItem index={i} onClick={handleClose}>
        {item}
      </MenuItem>
    );
  };

  const renderMenuItems = () => {
    return <div>{props.history.map(renderItem)}</div>;
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ color: "grey", marginTop: "10px" }}
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
        {props.history ? renderMenuItems() : <div />}
      </Menu>
    </div>
  );
}
