import React, { useState } from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import SearchHistory from "./SearchHistory";

const UserForm = ({ getFeed, previous_feeds, past }) => {
  const [enabled, setEnabled] = useState(true);
  const [feeds, setFeeds] = useState([]);

  const handleSearchChange = (event) => {
    const { value } = event.target;

    if (value === "") return setEnabled(true);

    setEnabled(false);
    setFeeds([...feeds, value]);
  };

  return (
    <div>
      <form onSubmit={getFeed}>
        <Input
          style={{ margin: "20px auto", display: "block" }}
          type="text"
          name="feed_url"
          onChange={handleSearchChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={enabled}
        >
          Submit
        </Button>
        {past ? <SearchHistory history={previous_feeds} /> : <div></div>}
      </form>
    </div>
  );
};

export default UserForm;
