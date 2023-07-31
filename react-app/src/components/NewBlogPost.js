import React, { Component } from 'react'

export class NewBlogPost extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            title: "",
            content: "",
            image1: "",
            image2: "",
            image3: "",
        }
    }

  render() {
    return (
      <div>
        <h2>New Blog Post</h2>
        <form>
            <div>
                <label for="title">Title</label>
                <input type="text" id="title" name="title" value={this.state.title}></input>
            </div>

            <div>
                <label for="content">Content</label>
                <textarea id="content" name="content" value={this.state.content}></textarea>
            </div>

            <div>
            <label for="image1">Image 1</label>
            <input type="file" id="image1" name="image1" value={this.state.image1}></input>
            </div>

            <div>
            <label for="image2">Image 2</label>
            <input type="file" id="image2" name="image2" value={this.state.image2}></input>
            </div>

            <div>
            <label for="image3">Image 3</label>
            <input type="file" id="image3" name="image3" value={this.state.image3}></input>
            </div>

            <br></br>
            <input type="submit" value="Submit"></input>
        </form>
      </div>
    )
  }
}

export default NewBlogPost