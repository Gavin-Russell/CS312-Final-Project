import React, { Component } from 'react'
import { EditProfile } from './Requests'
import { Cookies } from "react-cookie";

export class EditProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // get username from cookies
      userName: props.username,
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value } )
  }

  handleUpdate = async (event) => {
    event.preventDefault()

    console.log(this.state)
    
    // send request to update user info
    var res
    try {
      res = await EditProfile(this.state)
      // window.alert(res.data.message)
      document.getElementById("status").innerHTML = res.data.message
      document.getElementById("status").style.color = "green"
    }
    catch (error) {
      // window.alert(error.response.data.message)
      document.getElementById("status").innerHTML = error.response.data.message
      document.getElementById("status").style.color = "red"
    }
  }

  render() {
    return (
      <div>
        <h2>Edit {this.props.username}'s Profile Information</h2>
        <form>
            <div>
                <label for="password">New Password</label>
                <input type="password" id="password" name="password" placeholder="Password" onChange={this.handleChange}></input>
            </div>

            <div>
                <label for="confirmPassword"></label>
                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" onChange={this.handleChange}></input>
            </div>

            <div>
                <label for="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" placeholder="John" onChange={this.handleChange}></input>
            </div>

            <div>
                <label for="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" placeholder="Doe" onChange={this.handleChange}></input>
            </div>

            <input type="submit" value="Update" onClick={this.handleUpdate}></input>
        </form>
      </div>
    )
  }
}

export default EditProfilePage;