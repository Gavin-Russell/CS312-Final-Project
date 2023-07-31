import React, { Component } from 'react'

export class EditCommentsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      comments: [],
      comment: ""
    }
  }

  render() {
    return (
      <div>EditCommentsPage</div>
    )
  }
}

export default EditCommentsPage