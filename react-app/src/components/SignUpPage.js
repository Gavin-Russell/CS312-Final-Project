import React, { Component } from 'react'
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { SignUp } from './Requests'
import LogIn from './Requests'



class SignUpPage extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         firstName: "",
         lastName: "",
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
        <h1>SIGN UP</h1>
        <form onSubmit={this.props.handleSignUp}>

            <label>First Name: </label>
            <input
                type="text"
                name="firstName"
                onChange={this.handleChange}
            />

            <br></br>

            <label>Last Name: </label>
            <input
                type="text"
                name="lastName"
                onChange={this.handleChange}
            />

            <br></br>

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

            <button>Sign Up</button>

        </form>
      </div>
    )
  }
}

export default SignUpPage