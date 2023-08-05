import React, { Component } from 'react'

export class EditCommentsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      comments: [{
        title: "Test Title",
        content: "Test Content" 
      },
      {
        title: "Test Title 2",
        content: "Test Content 2"
    },
    {
      title: "Test Title 3",
      content: "Test Content 3"
    }],
    }
  }

  // TODO: Implement comment editing
  handleCommentEdit = () => {
    console.log("Edit comment")
  }

  render() {
    return (
      <div>
        <h2>Comments</h2>
          {this.state.comments.map((comment) => {
            return (
              <div>
                <h3>{comment.title}</h3>
                <p>{comment.content}</p>
                <button onClick={this.handleCommentEdit}>Edit</button>
              </div>
            )
          })}
      </div>
    )
  }
}

export default EditCommentsPage