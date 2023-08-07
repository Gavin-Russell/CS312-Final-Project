import React, { Component } from "react";
import { Cookies } from "react-cookie";
import NavBar from "./NavBar";
import BlogPostList from "./BlogPostList";
import { SignUp } from "./Requests";
import LogIn from "./Requests";

const cookies = new Cookies();
class MainPage extends Component {
  constructor(props) {
    super(props);

    this.loginRef = React.createRef();
    this.signupRef = React.createRef();
    this.state = {
      token: cookies.get('token') || null,
      pageContent: <BlogPostList></BlogPostList>
    }
  }

  updatePageContent = (content) => {
    this.setState({
      pageContent: content
    })

    document.getElementById("status").innerHTML = ""
  }

  updateToken = (token) => {
    this.setState({
      token: token
    })

    cookies.set("token", token)

    console.log("Token: " + this.state.token)

    localStorage.clear()
  }

  handleLogin = async (event) => {
    event.preventDefault();

    //get the login component to access its state
    var loginElement = this.loginRef.current;

    //if any fields are left empty
    if (
      loginElement.state.password === "" ||
      loginElement.state.userName === ""
    ) {
      //window.alert("All entries must be filled");
      document.getElementById("status").innerHTML = "All entries must be filled"
      document.getElementById("status").style.color = "red"
    }

    //otherwise it will attempt to log in
    else {
      
      LogIn(loginElement.state).then( res => { 
        //on successful login
        
        //display success message
        // window.alert(res.data.message)
        // document.getElementById("status").innerHTML = res.data.message
        // document.getElementById("status").style.color = "green"

        //redirect, login, and cookies
        cookies.set('token', loginElement.state.userName)
        this.setState({
          token: loginElement.state.userName,
	        pageContent: <BlogPostList></BlogPostList>
        })

      }).catch ( res => { 
        //on unsucessful login

        //display error message
        //window.alert(res.response.data.message)
        document.getElementById("status").innerHTML = res.response.data.message
        document.getElementById("status").style.color = "red"

      })
    }
  };

  handleSignUp = async (event) => {
    event.preventDefault();

    //get the signup component to access its state
    var signupElement = this.signupRef.current;

    //if any fields are left empty
    if (
      signupElement.state.firstName === "" ||
      signupElement.state.password === "" ||
      signupElement.state.lastName === "" ||
      signupElement.state.userName === ""
    ) {
     //window.alert("All entries must be filled");
      document.getElementById("status").innerHTML = "All entries must be filled"
      document.getElementById("status").style.color = "red"
    }

    //also username cannot be null
    else if( signupElement.state.userName === "null" ) {
      //window.alert("That username is not valid")
      document.getElementById("status").innerHTML = "That username is not valid"
      document.getElementById("status").style.color = "red"
    }

    //otherwise it will attempt to sign up
    else {
      
      SignUp(signupElement.state).then( res => {

        //on succesful sign up

        //display the success message
        //window.alert(res.data.message)
        // document.getElementById("status").innerHTML = res.data.message
        // document.getElementById("status").style.color = "green"

        //redirect, login, and cookies
        cookies.set('token', signupElement.state.userName)
        this.setState({
          token: signupElement.state.userName,
		      pageContent: <BlogPostList></BlogPostList>
        })

      }).catch ( res => {
        //on unsuccesful sign up

        //display the error message
        //window.alert(res.response.data.message)
        document.getElementById("status").innerHTML = res.response.data.message
        document.getElementById("status").style.color = "red"
        
      })
      
    }
  };

  handleLogout = async (event) => {
    //remove the token
    cookies.remove('token')

    //update the state
    this.setState({
      token: null
    })

    //redirect to the home page
    this.updatePageContent(<BlogPostList></BlogPostList>)

    //display the success message in status paragraph element
    //window.alert("You have been logged out")
    // document.getElementById("status").innerHTML = "You have been logged out"
    // document.getElementById("status").style.color = "green"
  }

  render() {
    return (
      <div>
        <NavBar token={this.state.token} 
                updatePageContent={this.updatePageContent}
                updateToken={this.updatePageContent}
                loginRef={this.loginRef}
                signupRef={this.signupRef}
                handleSignUp={this.handleSignUp}
                handleLogin={this.handleLogin}
                handleLogout={this.handleLogout}></NavBar>
        <> {this.state.pageContent} </>
        <p id="status"></p> {/* status paragraph element for error messages */}
      </div>
    );
  }
}

export default MainPage;
