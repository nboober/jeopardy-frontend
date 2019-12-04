import React from 'react';

let CardFront = (props) => {

    return (
        <div className="card" style={{width: "11rem", height: "11rem", textAlign: "center"}} onClick={() => (props.flipCard(props.obj))} >
            <div className="card-body">
                <h5 className="card-title">{props.category}</h5>
                <p className="card-text">{props.value}</p>
            </div>    
        </div>
    )
}

export default CardFront