import React, { Component } from 'react'
import ProfileNavBar from './ProfileNavBar.js'
import NewBlogPost from './NewBlogPost.js';
import { Cookies } from "react-cookie";

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
  }


  render() {
    return (
      <div>
        <ProfileNavBar updatePageContent={this.updatePageContent}></ProfileNavBar>
        {this.state.pageContent}

      </div>
    )
  }
}

export default ProfilePage