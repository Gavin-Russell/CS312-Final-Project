import React, { Component } from 'react'
import EditProfilePage from './EditProfilePage.js'
import BlogPostList from './BlogPostList'
import NewBlogPost from './NewBlogPost'
import { deleteComment } from './Requests'

export class ProfileNavBar extends Component {

    handleEditProfile = (event) => {
        event.preventDefault()
        this.props.updatePageContent(<EditProfilePage username={this.props.username}></EditProfilePage>)
    }

    handleBlogPosts = (event) => {
        event.preventDefault()
        this.props.updatePageContent(<BlogPostList filter="all" username={this.props.username}></BlogPostList>)
    }

    handleNewBlogPost = (event) => {
        event.preventDefault()
        this.props.updatePageContent(<NewBlogPost></NewBlogPost>)
    }
  
    deleteHandler = async (commentNum) => {
        let newComments = (await deleteComment(this.state.Number, commentNum)).data;

        this.setState({
          CommentList: newComments,
        });
    }

    render() {
    return (
        <div>
            <h1>Profile</h1>
            <button onClick={this.handleEditProfile}>Edit Profile</button>
            <button onClick={this.handleBlogPosts}>Blog Post History</button>
            <button onClick={this.handleNewBlogPost}>New Blog Post</button>
        </div>
    )
  }
}


export default ProfileNavBar