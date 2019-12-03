import React from 'react';

let CardFront = (props) => {
    return (
        <div>
        <h3>{props.category}</h3>
        <h3>{props.value}</h3>
    
        </div>
    )
}

export default CardFront