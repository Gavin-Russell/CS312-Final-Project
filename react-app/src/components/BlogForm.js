import React, { Component } from "react";

class BlogForm extends Component {
  constructor() {
    super();
    if (this.props.text)
      this.state = {
        User: this.props.user,
        Text: this.props.text,
        Tag: this.props.tag,
        Title: this.props.title,
      };
    else {
      this.state = {
        User: this.props.user,
        Text: "Enter text here",
        Tag: "Select Tag",
        Title: "Enter title here",
      };
    }
  }

  handleTitleChange = (event) => {
    this.setState({ Title: event.target.value });
  };

  handleTextChange = (event) => {
    this.setState({ Text: event.target.value });
  };

  handleTagChange = (event) => {
    this.setState({ Tag: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    //call the appropriate handler
    this.props.editHandler(this.state);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Title</label>
          <input type="text" onChange={this.handleTitleChange}></input>
          <label>Text</label>
          <input type="text" onChange={this.handleTextChange}></input>
          <label>Tag</label>
          <select value={this.state.Tag} onChange={this.handleTagChange}>
            <option value="Glasses">Glasses</option>
            <option value="Nature">Nature</option>
            <option value="Food">Food</option>
            <option value="City">City</option>
          </select>
          <input type="submit">Save Changes</input>
        </form>
      </div>
    );
  }
}
