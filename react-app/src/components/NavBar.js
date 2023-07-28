import { Component } from 'react'
import LoginPage from './LoginPage'
import SignUpPage from './SignUpPage'
import ProfilePage from './ProfilePage'


export class NavBar extends Component {

  constructor(props) {
    super(props)

    this.state = {
      filter: "All"
    }
  }

  // TODO: Implement filter
  handleFilter = (event) => {
    event.preventDefault()
    this.setState({
      filter: document.getElementById("Filter by:").value
    })

    console.log("Filtering by: " + this.state.filter)
  }

  handleLogin = (event) => {
    event.preventDefault()
    this.props.updatePageContent(<LoginPage handleLogin={this.handleLogin}></LoginPage>)
    
    // console.log("Login")
  }

  handleSignUp = (event) => {
    event.preventDefault()
    this.props.updatePageContent(<SignUpPage ref={this.signupRef} handleSignUp={this.handleSignUp}></SignUpPage>)

    // console.log("Sign Up")
  }

  handleProfile = (event) => {
    event.preventDefault()
    this.props.updatePageContent(<ProfilePage></ProfilePage>)

    // console.log("Profile")
  }

  // TODO: Implement logout
  handleLogout = (event) => {
    event.preventDefault()

    console.log("Logout")
  }

  render() {
    return (
      <div>
        <nav>
          <label htmlFor="Filter by:">Filter by:</label>
          <select name="Filter by:" id="Filter by:">
            <option value="All">All</option>
            <option value="Username">Username</option>
            <option value="Nature">Nature</option>
            <option value="City">City</option>
            <option value="Food">Food</option>
            <option value="Glasses">Glasses</option>
          </select>
          <input type="button" value="Filter" onClick={this.handleFilter}></input>

          {this.props.token === null ?
            <>
            <ul><button onClick={this.handleLogin}>Login</button></ul>
            <ul><button onClick={this.handleSignUp}>Sign Up</button></ul>
            </>:
            <>
            <ul><button onClick={this.handleProfile}>Profile</button></ul>
            <ul><button onClick={this.handleLogout}>Logout</button></ul>
            </>}
        </nav>
      </div>
    )

  }
}

export default NavBar