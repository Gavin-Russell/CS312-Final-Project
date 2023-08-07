import React, { Component } from 'react'
import EditProfilePage from './EditProfilePage.js'
import EditCommentsPage from './EditCommentsPage'
import BlogPostList from './BlogPostList'
import NewBlogPost from './NewBlogPost'

export class ProfileNavBar extends Component {

    handleEditProfile = (event) => {
        event.preventDefault()
        this.props.updatePageContent(<EditProfilePage username={this.props.username}></EditProfilePage>)
    }

    // TODO: Implement comment history fetching
    handleEditComments = (event) => {
        event.preventDefault()
        this.props.updatePageContent(<EditCommentsPage></EditCommentsPage>)
    }

    // TODO: Implement blog post history fetching
    handleBlogPosts = (event) => {
        event.preventDefault()
        this.props.updatePageContent(<BlogPostList></BlogPostList>)
    }

    handleNewBlogPost = (event) => {
        event.preventDefault()
        this.props.updatePageContent(<NewBlogPost></NewBlogPost>)
    }
  
    render() {
    return (
        <div>
            <h1>Profile</h1>
            <button onClick={this.handleEditProfile}>Edit Profile</button>
            <button onClick={this.handleEditComments}>Comment History</button>
            <button onClick={this.handleBlogPosts}>Blog Post History</button>
            <button onClick={this.handleNewBlogPost}>New Blog Post</button>
        </div>
    )
  }
}


export default ProfileNavBar