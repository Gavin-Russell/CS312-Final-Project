import React, { Component } from 'react'

export class EditProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
    }
  }

  render() {
    return (
      <div>
        <h2>Edit Profile</h2>
        <form>
            <div>
                <label for="username">Username</label>
                <input type="text" id="username" name="username"></input>
            </div>

            <div>
                <label for="password">Password</label>
                <input type="password" id="password" name="password"></input>
            </div>

            <div>
                <label for="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName"></input>
            </div>

            <div>
                <label for="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName"></input>
            </div>
        </form>
      </div>
    )
  }
}

export default EditProfilePage