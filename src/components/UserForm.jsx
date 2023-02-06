import React, { useContext, useState } from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import { Context } from "../context/Context";
import { getFeed } from "./utils/httpRequests";

const UserForm = () => {
  const { dispatch } = useContext(Context);
  const [enabled, setEnabled] = useState(true);
  const [feeds, setFeeds] = useState([]);

  const handleSearchChange = (event) => {
    const { value } = event.target;

    if (value === "") return setEnabled(true);

    setEnabled(false);
    setFeeds([...feeds, value]);
  };

  const fetchFeed = async (event) => {
    dispatch({ type: 'SET_FETCHING',  payload: true });
    try {
      const feed = await getFeed(event);
      dispatch({type: 'SET_CURRENT_FEED', payload: feed})
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
    <div>
      <form onSubmit={fetchFeed}>
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
