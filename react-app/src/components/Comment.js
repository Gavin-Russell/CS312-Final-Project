import React, { Component } from "react";
import CommentForm from "./CommentForm";
//import { withCookies } from "react-cookie";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Number: this.props.number,
      signedIn: this.props.signedIn,
      User: this.props.user,
      Text: this.props.text,
      Editing: false,
    };
  }

  handleEditButton = (event) => {
    //set the editing state to re render the editor component
    this.setState({ Editing: true });
  };

  handleSaveEdit = (formState) => {
    this.props.editHandler(formState, this.state.Number);
  };

  render() {
    let pageContent;
    //check if the editable version should be open
    if (this.state.Editing) {
      pageContent = (
        <CommentForm
          user={this.state.User}
          text={this.state.Text}
          handler={this.handleEditButton}
          saveHandler={this.handleSaveEdit}
          editing = {true}
        />
      );
    } else {
      pageContent = (
        <div className="Comment">
          <h3 className="commentUser">{this.state.User}</h3>
          <p className="commentText">{this.state.Text}</p>
          {this.state.signedIn ? (
            <button onClick={this.handleEditButton}>Edit Comment</button>
          ) : null}
        </div>
      );
    }
    return pageContent;
  }
}

export default Comment;
