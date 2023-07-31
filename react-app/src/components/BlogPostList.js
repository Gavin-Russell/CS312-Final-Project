import React, { Component } from "react";
import { getAllPosts } from "./Requests";
import BlogPost from "./BlogPost";

export class BlogPostList extends Component {
  constructor() {
    super();
    //get list for blog posts
    const postList = getAllPosts();
    //put it in state
    this.state = {
      PostList: postList,
    };
    console.log(this.state);
  }

  // async componentDidMount() {
  //   const postList = await getAllPosts();
  //   console.log(postList);
  //   this.setState({ PostList: postList });
  //   console.log("list state: ", this.state);
  // }

  render() {
    let pageContent = <h1>Nothing to show here</h1>;
    if (this.state.PostList.length != 0) {
      pageContent = (
        <div>
          <h2>Blog Post List Component</h2>
          {this.state.PostList.map((post) => {
            console.log("post: ", post);
            return <BlogPost data={post} />;
          })}
        </div>
      );
    }
    return pageContent;
  }
}

export default BlogPostList;
