import React, { Component } from "react";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    //check if props were passed down
    if (this.props.text) {
      this.state = {
        User: this.props.user,
        Text: this.props.text,
      };
    } else {
      this.state = {
        User: this.props.user,
        Text: "",
      };
    }
  }

  handleTextChange = (event) => {
    this.setState({ Text: event.target.value });

    if(event.target.parentNode.querySelector(".status") !== null) {
      event.target.parentNode.querySelector(".status").innerHTML = "";
    }
  };

  submitHandler = (event) => {
    event.preventDefault();

    if (this.state.Text === "") {
      event.target.querySelector(".status").innerHTML = "Please enter a comment";
      event.target.querySelector(".status").style.color = "red";
      return;
    }

    this.props.handler(event);
  };

  render() {
    return (
      <div className="commentForm">
        <form onSubmit={this.submitHandler}>
          <h4>{this.state.User}</h4>
          <div className="addComment">
            <input
              type="textarea"
              placeholder="New Comment"
              value={this.state.Text}
              onChange={this.handleTextChange}>
            </input>
          
            {this.props.editing ? (
              <>
              <input type="button" value="Cancel" onClick={this.props.handler}></input>
              <input type="submit" value="Save" onClick={this.props.handler}></input>
              </>
            ) : 
              <input type="submit" value="Comment"></input>
            }

          </div>
          <p className="status"></p>
        </form>
      </div>
    );
  }
}

export default CommentForm;
