import React from 'react'
import {Link} from 'react-router-dom'

class Profile extends React.Component{
    render(){
        return(
            <div>
                <Link to="/" onClick={this.props.logout}>Logout</Link>

                Hello
            </div>
        )
    }
}

export default Profile