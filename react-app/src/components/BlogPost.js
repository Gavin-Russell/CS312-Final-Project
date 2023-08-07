import React, { Component } from "react";
import Comment from "./Comment";
import { withCookies } from "react-cookie";

export class BlogPost extends Component {
  constructor(props) {
    super(props);
    console.log("constructing blog");
    console.log("props: ", this.props);
    this.state = {
      User: this.props.data.user,
      Number: this.props.number,
      Title: this.props.data.title,
      Tag: this.props.data.tag,
      Text: this.props.data.description,
      CommentList: this.props.comments,
      currUser: this.props.cookies.get("token"),
    };
  }

  EditHandler = (formState) => {
    this.props.handler(formState, this.state.Number);
  };

  CommentEditHandler = (formState, commentNum) => {
    this.props.commentHandler(formState, commentNum, this.state.Number);
  };

  // How one would add a comment using the enter key
  // give or take lol
  handleNewComment = (event) => {
    event.preventDefault();
    if (event.key === "Enter" && event.target.value !== "") {
      let newComment = {
        User: this.state.currUser,
        Text: event.target.value,
      };

      this.setState({
        CommentList: [...this.state.CommentList, newComment],
      });
    } else {
      return;
    }
  };

  render() {
    if (this.props == null) {
      return null;
    }
    return (
      <div className="blog post">
        <hr></hr>
        <h3 className="username">User: {this.state.User}</h3>
        <h2 className="title">{this.state.Title}</h2>
        <p className="description">{this.state.Text}</p>
        <p className="tag">{this.state.Tag ? "#" + this.state.Tag : null}</p>

        <div>
          {this.state.CommentList.map((comment) => {
            let userMatch = this.state.currUser === comment.User;
            return (
              <Comment
                user={comment.User}
                text={comment.text}
                editing={false}
                number={comment.number}
                signedIn={userMatch}
              />
            );
          })}
        </div>
        <hr></hr>
      </div>
    );
  }
}

export default withCookies(BlogPost);
