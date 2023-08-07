import { Component } from 'react'
import LoginPage from './LoginPage'
import SignUpPage from './SignUpPage'
import ProfilePage from './ProfilePage'
import BlogPostList from './BlogPostList'

export class NavBar extends Component {

  constructor(props) {
    super(props)

    this.state = {
      filter: "All",
      logInButtons: <></>
    }
  }

  // set login buttons when component mounts
  componentDidMount() {
    var logInButtons = <></>;
    if(this.props.token === null) {
      logInButtons = <>
        <ul><button onClick={this.handleLogin}>Login</button></ul>
        <ul><button onClick={this.handleSignUp}>Sign Up</button></ul>
      </>;
    } else {
      logInButtons = <>
        <ul><button onClick={this.handleProfile}><small>Hello {this.props.token}!</small><br/>Profile</button></ul>
        <ul><button onClick={this.handleLogout}>Logout</button></ul>
      </>;
    }

    this.setState({
      logInButtons: logInButtons
    })
  }

  handleFilter = async (event) => {
    event.preventDefault()
    await this.setState({
      filter: event.target.value
    })

    this.props.updatePageContent(<BlogPostList key={this.state.filter} filter={this.state.filter}></BlogPostList>)

    console.log("Filtering by: " + this.state.filter)
  }

  handleLogin = (event) => {
    event.preventDefault()
    this.props.updatePageContent(<LoginPage ref={this.props.loginRef} handleLogin={this.props.handleLogin}></LoginPage>)

    if(this.props.token !== null) {
      this.setState({
        logInButtons: <>
          <ul><button onClick={this.handleProfile}>Profile</button></ul>
          <ul><button onClick={this.handleLogout}>Logout</button></ul>
        </>
      })
    }
  }

  handleSignUp = (event) => {
    event.preventDefault()
    this.props.updatePageContent(<SignUpPage ref={this.props.signupRef} handleSignUp={this.props.handleSignUp}></SignUpPage>)

    if(this.props.token !== null) {
      this.setState({
        logInButtons: <>
          <ul><button onClick={this.handleProfile}>Profile</button></ul>
          <ul><button onClick={this.handleLogout}>Logout</button></ul>
        </>
      })
    }
  }

  handleLogout = (event) => {

    this.props.updatePageContent(<BlogPostList key={this.state.filter} filter={this.state.filter} handleLogout={this.props.handleLogout}></BlogPostList>)

    // rerender nav
    this.setState({
      logInButtons: <>
        <ul><button onClick={this.handleLogin}>Login</button></ul>
        <ul><button onClick={this.handleSignUp}>Sign Up</button></ul>
      </>
    })

    // console.log("Logout")
  }

  handleProfile = (event) => {
    event.preventDefault()
    this.props.updatePageContent(<ProfilePage username={this.props.token}></ProfilePage>)

    // console.log("Profile")
  }

  render() {
    return (
      <div>
        <nav>
          <button onClick={this.handleFilter}>Home</button>

          <div>
            <label htmlFor="Filter by: ">Filter by:</label>
            <select name="Filter by: " id="Filter by: " onChange={this.handleFilter}>
              <option value="All">All</option>
              <option value="Nature">Nature</option>
              <option value="City">City</option>
              <option value="Food">Food</option>
              <option value="Glasses">Glasses</option>
            </select>
            {/* <input type="button" value="Filter" onClick={this.handleFilter}></input> */}
          </div>

          {this.state.logInButtons}
        </nav>
      </div>
    )

  }
}

export default NavBar