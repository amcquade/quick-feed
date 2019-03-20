import React, { Component } from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";


const UserForm = props => {
  return (
    <form onSubmit={props.getFeed}>
      <Input
        style={{ margin: "20px auto", display: "block" }}
        type="text"
        name="feed_url"
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default UserForm;
