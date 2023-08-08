import React, { Component } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { withCookies } from "react-cookie";
import { updateBlogPost } from "./Requests";
import { deleteComment } from "./Requests";

export class BlogPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      User: this.props.data.userName,
      Id: this.props.id,
      Title: this.props.data.title,
      Tag: this.props.data.tag,
      Text: this.props.data.description,
      CommentList: this.props.comments,
      currUser: this.props.cookies.get("token"),
      blogHistory: this.props.blogHistory,
      blogEditing: false,
    };
  }

  DeleteHandler = () => {
    this.props.deleteHandler({"id":this.state.Id})
  }

  CommentEditHandler = (formState, commentNum) => {

    this.props.commentHandler(formState, commentNum, this.state.Id);
  };

  CommentDeleteHandler = async (commentNum) => {
    let newComments = (await deleteComment(this.state.Id, commentNum)).data;

    this.setState({
      CommentList: newComments,
    });
  };

  // How one would add a comment using the enter key
  // give or take lol
  handleNewComment = (event) => {
    event.preventDefault();

    if (event.target.querySelector("input").value === "Cancel") {

      return;
    }
    
    let newComment = {
      User: this.state.currUser,
      text: event.target.querySelector("input").value,
      number: this.state.CommentList.length,
    };

    this.setState({
      CommentList: [...this.state.CommentList, newComment],
    });

    event.target.querySelector("input").value = "";

    // update the database
    let updatedPost = {
      id: this.state.Id,
      user: this.state.User,
      title: this.state.Title,
      tag: this.state.Tag,
      description: this.state.Text,
      comments: [...this.state.CommentList, newComment],
    };

    updateBlogPost(updatedPost);
  }

  render() {
    console.log(this.state)
    if (this.props == null) {
      return null;
    }
    return (
      <div className="blog post">
        {!this.state.blogEditing ? (
        <>
          <hr></hr>
          <h3 className="username">{this.state.User}: </h3>
          <h2 className="title">"{this.state.Title}"</h2>

          <br></br>
          <br></br>
          <p className="tag">{this.state.Tag ? " #" + this.state.Tag : null}</p>
          <p className="description">{this.state.Text}</p>


          <br></br>
        </>
        ) : (
        <>
          <hr></hr>
          <form onSubmit={this.handleUpdate}>
            <h3 className="username">User: {this.state.User}</h3>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="Title"
              value={this.state.Title}
              onChange={this.handleChange}
            ></input>
          
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="Text"
              value={this.state.Text}
              onChange={this.handleChange}
            ></textarea>

            <input type="submit" value="Update"></input>
            <input type="button" value="Cancel" onClick={this.handleCancel}></input>
          </form>
          <p className="tag">{this.state.Tag ? " #" + this.state.Tag : null}</p>
        </>
        )}

        <div> {this.state.blogHistory ? <div> <br></br> <button onClick={this.DeleteHandler}>Delete Post</button></div> : <CommentForm handler={this.handleNewComment}/>} </div>

        <div> 
          <h2><u>Comments</u></h2>
          {this.state.CommentList.map((comment) => {
            let userMatch = this.state.currUser === comment.User;
            return (
              <Comment
                user={comment.User}
                text={comment.text}
                editing={false}
                number={comment.number}
                signedIn={userMatch}
                deleteHandler={this.CommentDeleteHandler}
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
