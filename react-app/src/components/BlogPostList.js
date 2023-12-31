import React, { Component } from "react";
import { getPosts, updateBlogPost, deleteBlogPost } from "./Requests";
import BlogPost from "./BlogPost";

export class BlogPostList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Filter: this.props.filter,
      PostList: [],
      blogHistory: this.props.blogHistory,
    };
  }

  async componentDidMount() {
    //if they are filtering by tag
    if (
      this.props.filter === "Glasses" ||
      this.props.filter === "Nature" ||
      this.props.filter === "Food" ||
      this.props.filter === "City"
    ) {
      this.setState({
        Filter: this.props.filter,
        PostList: await getPosts({
          filter: "tag",
          tag: `${this.props.filter}`,
        }),
      });
    }

    //otherwise they are sorting by all
    else {
      this.setState({
        Filter: "all",
        PostList: await getPosts({"filter":"all", "userName":this.props.username}),
      })
    }
  }

  handlePostEdit = (formState, postId) => {
    //get the new post data
    let postNum = this.state.PostList.findIndex((post) => {
      return post._id === postId;
    });

    const newData = {
      user: formState.User,
      title: formState.Title,
      tag: formState.Tag,
      description: formState.Text,
      comments: this.state.PostList[postNum].comments,
    };
    //lets upload that to the db
    updateBlogPost(newData);
    //get the current post list
    let posts = this.state.PostList;

    //add to it
    posts[postNum] = newData;
    //put it back in the state
    this.setState({ PostList: posts });
  };

  handleCommentEdit = (commentState, commentNum, postNum) => {
    //get the new data
    let newComments = this.state.PostList[postNum].comments;
    newComments = JSON.parse(newComments);
    const commentData = {
      user: commentState.User,
      text: commentState.Text,
      number: commentState.Number,
    };

    newComments[commentNum] = commentData;
    newComments = JSON.stringify(newComments);
    let posts = this.state.PostList;
    posts[postNum].comments = newComments;

    updateBlogPost(posts[postNum]);

    this.setState({ PostList: posts });
  };

  handleDeleteButton = async (blog_id) => {
    //delete the post
    await deleteBlogPost(blog_id);

    this.setState({
      Filter: "all",
      PostList: await getPosts({"filter":"all", "userName":this.props.username})
    })
  }

  render() {
    let pageContent = <h1>Nothing to show here</h1>;
    if (this.state.PostList !== null && this.state.PostList.length > 0 && this.state.PostList !== undefined) {
      pageContent = (
        <div>
          <h1>
            <u>Posts</u>
          </h1>
          {this.state.PostList.map((post) => {
            return (
              <BlogPost
                key={this.props.filter}
                data={post}
                id={post._id}
                comments={post.comments}
                handler={this.handlePostEdit}
                updateHandler={this.handleEditButton}
                deleteHandler={this.handleDeleteButton}
                commentHandler={this.handleCommentEdit}
                blogHistory={this.state.blogHistory}
                blogEditing={this.state.blogEditing}
              />
            );
          })}
        </div>
      );
    }
    return pageContent;
  }
}

export default BlogPostList;
