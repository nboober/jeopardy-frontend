import React from 'react';
import {Link} from 'react-router-dom'


let User = (props) => {

    return (
        <div>
            <h3 style={{fontSize: "40px"}}><Link to="/profile">Welcome {props.username}</Link></h3>
            <h3>Score: {props.score} Points</h3>
        </div>
    )
}

export default User