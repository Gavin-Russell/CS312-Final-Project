import React, { Component } from 'react'
import { userComments } from './Requests'
import Comment from './Comment'

export class EditCommentsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      comments: []
    }
  }

  async componentDidMount() {
    this.setState({
      comments: (await userComments({userName: this.props.username})).data
    })
    // console.log(Array.isArray(this.state.comments))
  }

  render() {
    return (
      <div>
        <h2>Comments</h2>
          {this.state.comments.map((comment) => {
            return (
              <Comment
                user={comment.User}
                text={comment.text}
                editing={false}
                number={comment.number}
                signedIn={true}
              />
            )})}
      </div>
    )
  }
}

export default EditCommentsPage