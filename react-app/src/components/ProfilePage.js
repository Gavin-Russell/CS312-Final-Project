import React, { Component } from 'react'
import ProfileNavBar from './ProfileNavBar.js'

export class ProfilePage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      pageContent: <ProfileNavBar></ProfileNavBar>
    }
  }
  
  render() {
    return (
      <div>
        <ProfileNavBar></ProfileNavBar>

      </div>
    )
  }
}

export default ProfilePage