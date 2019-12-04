import React from 'react';

let User = (props) => {

    return (
        <div>
            <h3>{props.username}</h3>
            <h3>{props.score}</h3>
        </div>
    )
}

export default User