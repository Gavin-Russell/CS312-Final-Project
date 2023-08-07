import React, { Component } from 'react'
import { Cookies } from 'react-cookie'
import { addBlogPost } from "./Requests";

const cookies = new Cookies();
export class NewBlogPost extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            userName: cookies.get('token'),
            title: "",
            description: "",
            tag: ""
            // image1: "",
            // image2: "",
            // image3: "",
        }
    }

    handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value } )
    }

    handleSubmit = async (event) => {
      event.preventDefault();

      //if any fields are left empty
      if ( this.state.title === "" || this.state.description === "" ) {
        //window.alert("All entries must be filled");
        document.getElementById("status").innerHTML = "All entries must be filled"
        document.getElementById("status").style.color = "red"
        return
      }

      addBlogPost(this.state).then( res => {

        //on succesful sign up

        //display the success message
        //window.alert(res.data.message)
        document.getElementById("status").innerHTML = res.data.message
        document.getElementById("status").style.color = "green"

      }).catch ( res => {
        //on unsuccesful sign up

        //display the error message
        //window.alert("There was an error adding the post")
        document.getElementById("status").innerHTML = "There was an error adding the post"
        document.getElementById("status").style.color = "red"
        
      })

    }

  render() {
    return (
      <div>
        <h2>New Blog Post</h2>
        <form onSubmit={this.handleSubmit}>
            <div>
                <label for="title">Title</label>
                <input type="text" id="title" name="title" value={this.state.title} onChange={this.handleChange}></input>
            </div>

            <div>
                <label for="content">Content</label>
                <textarea id="description" name="description" value={this.state.content} onChange={this.handleChange}></textarea>
            </div>

            <div>
            <label htmlFor="tag">Tag:</label>
            <select name="tag" id="tag" onChange={this.handleChange}>
              <option value="none" selected disabled hidden>Select a Tag</option>
              <option value="Nature">Nature</option>
              <option value="City">City</option>
              <option value="Food">Food</option>
              <option value="Glasses">Glasses</option>
            </select>
          </div>

            {/* <div>
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
            </div> */}

            <br></br>
            <button>Upload Post</button>
        </form>
      </div>
    )
  }
}

export default NewBlogPost