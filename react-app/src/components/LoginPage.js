import React, { Component } from 'react'
import LogIn from './Requests'

class LoginPage extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         userName: "",
         password: ""
      }
    }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value } )
  }


  render() {
    return (
      <div>
        <h1>LOGIN</h1>

        <form onSubmit={this.props.handleLogin}>
          
          <label>Username: </label>
          <input
              type="text"
              name="userName"
              onChange={this.handleChange}
          />

          <br></br>

          <label>Password: </label>
          <input
              type="password"
              name="password"
              onChange={this.handleChange}
          />

          <br></br>

          <button>Log In</button>

          </form>
      </div>
    )
  }
}

export default LoginPage