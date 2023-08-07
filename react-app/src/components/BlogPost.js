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
        <hr></hr>
        <h3 className="username">User: {this.props.data.userName}</h3>
        <h2 className="title">{this.props.data.title}</h2>
        <p className="description">{this.props.data.description}</p>
        <p className="tag">#{this.props.data.tag}</p>
        <hr></hr>
      </div>
    );
  }
}

export default BlogPost;
