import React, { Component } from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

class UserForm extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      enabled: true,
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(e) {
    const value = e.target.value;

    if (value !== '') { 
      this.setState({enabled : false});
    } else {
      this.setState({enabled : true});
    }
  };  

  render() {
    return (
      <form onSubmit={this.props.getFeed}>
        <Input
          style={{ margin: "20px auto", display: "block" }}
          type="text"
          name="feed_url"
          onChange={this.handleSearchChange}
        />
        <Button type="submit" variant="contained" color="primary" disabled={this.state.enabled}>
          Submit
        </Button>
      </form>
    );  
};
};

export default UserForm;
