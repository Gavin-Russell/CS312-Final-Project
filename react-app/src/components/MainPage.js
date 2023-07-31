import React, { Component } from "react";
import { Cookies } from "react-cookie";
import NavBar from "./NavBar";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import ProfilePage from "./ProfilePage";
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
      token: "check", //cookies.get('token') || null,
      
      // <LoginPage ref={this.loginRef} handleLogin={this.handleLogin}></LoginPage>
      // <SignUpPage ref={this.signupRef} handleSignUp={this.handleSignUp}></SignUpPage>
      pageContent: <BlogPostList></BlogPostList>,
    }
  }

  updatePageContent = (content) => {
    this.setState({
      pageContent: content
    })
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
      window.alert("All entries must be filled");
    }

    //otherwise it will attempt to log in
    else {
      var response = await LogIn(loginElement.state);

      //display the message
      window.alert(response.data.message);

      //if successful request
      if (response.data.message === "Successfully logged in!") {
        //redirect, login, and cookies
        cookies.set("token", loginElement.state.userName);
        this.setState({
          token: loginElement.state.userName,
        });
      }
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
      window.alert("All entries must be filled");
    }

    //also username cannot be null
    else if( signupElement.state.userName === "null" ) {
      window.alert("Username cannot be 'null'")
    }

    //otherwise it will attempt to sign up
    else {
      var response = await SignUp(signupElement.state);

      if (response.data.message === "User successfully added") {
        //redirect, login, and cookies
        cookies.set("token", signupElement.state.userName);
        this.setState({
          token: signupElement.state.userName,
        });
      }

      //display the message
      window.alert(response.data.message);

      //if successful request
      if (response.data.status === 200) {
        //redirect, login, and cookies
      }
    }
  };

  render() {
    return (
      <div>
        <NavBar token={this.state.token} updatePageContent={this.updatePageContent}></NavBar>
        <> {this.state.pageContent} </>
        {/* <> {this.state.pageContent} </> */}
        <BlogPostList />
      </div>
    );
  }
}

export default MainPage;
