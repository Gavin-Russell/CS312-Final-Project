import React, { Component } from 'react'
import { Cookies } from 'react-cookie';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage'
import { SignUp } from './Requests'
import LogIn from './Requests'

const cookies = new Cookies()
class MainPage extends Component {

    constructor(props) {
      super(props)
    
      this.loginRef = React.createRef();
      this.signupRef = React.createRef();
      this.state = {
        token: cookies.get('token') || null
      }
    }


  handleLogin = async (event) => {
    event.preventDefault()

    //get the login component to access its state
    var loginElement = this.loginRef.current

    //if any fields are left empty
    if(loginElement.state.password === "" || loginElement.state.userName === "") {
        window.alert("All entries must be filled")
    }

    //otherwise it will attempt to log in
    else{

      LogIn(loginElement.state).then( res => { 
        //on successful login
        
        //display success message
        window.alert(res.data.message)

        //redirect, login, and cookies
        cookies.set('token', loginElement.state.userName)
        this.setState({
          token: loginElement.state.userName
        })

      }).catch ( res => { 
        //on unsucessful login

        //display error message
        window.alert(res.response.data.message)

      })
    }
  }


  handleSignUp = async (event) => {
    event.preventDefault()

    //get the signup component to access its state
    var signupElement = this.signupRef.current

    //if any fields are left empty
    if(signupElement.state.firstName === "" || signupElement.state.password === "" ||
          signupElement.state.lastName === "" || signupElement.state.userName === "") {
        window.alert("All entries must be filled")
    }

    //also username cannot be null
    else if( signupElement.state.userName === "null" ) {
      window.alert("That username is not valid")
    }

    //otherwise it will attempt to sign up
    else{

      SignUp(signupElement.state).then( res => {

        //on succesful sign up

        //display the success message
        window.alert(res.data.message)

        //redirect, login, and cookies
        cookies.set('token', signupElement.state.userName)
        this.setState({
          token: signupElement.state.userName
        })

      }).catch ( res => {

        //on unsuccesful sign up

        //display the error message
        window.alert(res.response.data.message)

      })
    }
  }


  render() {

    return (
      <div>
        <LoginPage ref={this.loginRef} handleLogin={this.handleLogin}></LoginPage>
        <SignUpPage ref={this.signupRef} handleSignUp={this.handleSignUp}></SignUpPage>
        <div>{this.state.token}</div>
      </div>
    )
  }
}

export default MainPage