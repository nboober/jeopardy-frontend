import React from 'react';

let User = (props) => {

    return (
        <div>
            <h3 style={{fontSize: "40px"}}>Welcome {props.username}</h3>
            <h3>Score: {props.score} Points</h3>
        </div>
    )
}

export default User