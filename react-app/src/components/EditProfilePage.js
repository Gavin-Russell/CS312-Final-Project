import React, { Component } from 'react'
import { EditProfile } from './Requests'
import { Cookies } from "react-cookie";

export class EditProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    }
  }

  handleUpdate = async (event) => {
    event.preventDefault()

    // get user info from form
    this.setState({
      password: event.target.password,
      confirmPassword: event.target.confirmPassword,
      firstName: event.target.firstName,
      lastName: event.target.lastName,
    })

    // set username from cookie
    
    
    // send request to update user info
    var res
    try {
      res = await EditProfile(this.state)
      window.alert(res.data.message)
    }
    catch (error) {
      window.alert(error.response.data.message)
    }
  }

  render() {
    return (
      <div>
        <h2>Edit Profile</h2>
        <form>
            <div>
                <label for="password">New Password</label>
                <input type="password" id="password" name="password" placeholder="Password"></input>
            </div>

            <div>
                <label for="confirmPassword"></label>
                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password"></input>
            </div>

            <div>
                <label for="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" placeholder="John"></input>
            </div>

            <div>
                <label for="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" placeholder="Doe"></input>
            </div>

            <input type="submit" value="Update" onClick={this.handleUpdate}></input>
        </form>
      </div>
    )
  }
}

export default EditProfilePage;