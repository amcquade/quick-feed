import React, { useState } from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

const UserForm = ({ getFeed }) => {
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
          placeholder="Enter your RSS Feed here..."
          type="text"
          name="feed_url"
          onChange={handleSearchChange}
          aria-label="Enter your RSS Feed here..."
          style={{
            padding: "0.5rem 0",
          }}
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={enabled}
          style={{ marginTop: "10px" }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default UserForm;
