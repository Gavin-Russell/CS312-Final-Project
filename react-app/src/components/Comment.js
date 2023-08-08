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

  handleDeleteButton = (event) => {
    //delete the comment
    this.props.deleteHandler(this.state.Number);
  };

  handleSaveEdit = (formState) => {
    this.props.editHandler(formState, this.state.Number);
  };

  handleCancelEdit = (oldText) => {
    this.setState({ Editing: false });
    this.setState({ Text: oldText });

  };

  render() {
    let pageContent;
    //check if the editable version should be open
    if (this.state.Editing) {
      pageContent = (
        <>
        <CommentForm
          user={this.state.User}
          text={this.state.Text}
          handler={this.handleEditButton}
          saveHandler={this.handleSaveEdit}
          cancelHandler={this.handleCancelEdit}
          editing = {true}
        />
        </>
      );
    } else {
      pageContent = (
        <>
        <div className="Comment">
          <span className="commentUser"><strong>{this.state.User}: </strong></span>
          <span className="commentText">{this.state.Text}</span>
          {this.state.signedIn ? (
            <div>
            <button onClick={this.handleEditButton}>Edit Comment</button>
            <button onClick={this.handleDeleteButton}>Delete Comment</button>
            </div>
          ) : null}
        </div>
        </>
      );
    }
    return pageContent;
  }
}

export default Comment;
