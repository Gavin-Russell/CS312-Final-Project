import { Component } from "react";

export class BlogPost extends Component {
  constructor() {
    super();
    console.log("constructing blog");
    console.log("props: ", this.props);
    console.log("state: ", this.state);
    // this.state = {
    //   User: this.props.data.user,
    //   Title: this.props.data.title,
    //   Topic: this.props.data.topic,
    //   Text: this.props.data.text,
    // };
  }
  render() {
    if (this.props == null) {
      return null;
    }
    return (
      <div className="blog post">
        <h2 className="title">{this.props.data.title}</h2>
        <h3 className="username">{this.props.data.user}</h3>
        <p className="post text">{this.props.data.text}</p>
      </div>
    );
  }
}

export default BlogPost;
