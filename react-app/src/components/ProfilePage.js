import React, { Component } from 'react'
import ProfileNavBar from './ProfileNavBar.js'
import NewBlogPost from './NewBlogPost.js';

export class ProfilePage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      pageContent: <NewBlogPost></NewBlogPost>
    }
  }

  updatePageContent = (content) => {
    this.setState({
      pageContent: content
    })

    document.getElementById("status").innerHTML = ""
  }


  render() {
    return (
      <div>
        <ProfileNavBar updatePageContent={this.updatePageContent} username={this.props.username} blogHistory={true}></ProfileNavBar>
        {this.state.pageContent}
      </div>
    )
  }
}

export default ProfilePage