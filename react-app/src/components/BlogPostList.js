import React, { Component } from "react";
import { getPosts } from "./Requests";
import BlogPost from "./BlogPost";


export class BlogPostList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Filter: this.props.filter,
      PostList: [],
    };
  }
  
  async componentDidMount() {

    //if they are filtering by tag
    if ( this.props.filter === "Glasses" || this.props.filter === "Nature" || 
        this.props.filter === "Food" || this.props.filter === "City" ) {

      this.setState({
        Filter: this.props.filter,
        PostList: await getPosts( {"filter": "tag", "tag":`${this.props.filter}`} )
      })
    }

    //otherwise they are sorting by all
    else {
      this.setState({
        Filter: "all",
        PostList: await getPosts({"filter":"all", "userName":`${this.props.username}`})
      })
    }
  }

//STATIC PREVENTS ASYNC
//   static async getDerivedStateFromProps(props, state) {
//     if(props.filter !== state.filter){ //if the props have changed
//       console.log("PROP CHANGE")
//       console.log(state)
//       //if all posts will be shown
//       if (props.filter === "all") {
//         return{
//           Filter: "all",
//           PostList: await getPosts({"filter":"all"})
//         }
//       }
//       //otherwise they are filtering by tag
//       else {
//         return{
//           Filter: props.filter,
//           PostList: await getPosts( {"filter": "tag"}, {"tag":`${props.filter}`} )
//         }
//       }
//     }
//   return null; // Otherwise no change to state
// }

  render() {
    var pageContent = <h1>Nothing to show here</h1>;
    if (this.state.PostList !== null ) {
      pageContent = (
        <div>
          <h1><u>Posts</u></h1>
          {this.state.PostList.map( (post) => {
            return <BlogPost key={this.props.filter} data={post} />
          })}
        </div>
      )
    }
    return pageContent;
  }
}

export default BlogPostList;
