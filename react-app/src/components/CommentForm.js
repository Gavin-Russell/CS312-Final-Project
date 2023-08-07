import React, { Component } from "react";

class CommentForm extends Component {
  constructor() {
    super();
    //check if props were passed down
    if (this.props.text) {
      this.state = {
        User: this.props.user,
        Text: this.props.text,
      };
    } else {
      this.state = {
        User: this.props.user,
        Text: "Enter comment here",
      };
    }
  }

  handleTextChange = (event) => {
    this.setState({ Text: event.target.value });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.handler(this.state);
  };

  render() {
    return (
      <div className="commentForm">
        <form onSubmit={this.submitHandler}>
          <h3>{this.state.User}</h3>
          <label>Comment</label>
          <input
            type="text"
            value={this.state.Text}
            onChange={this.handleTextChange}
          ></input>
        </form>
      </div>
    );
  }
}

export default CommentForm;
