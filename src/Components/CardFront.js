import React from 'react';

let CardFront = (props) => {

    return (
        <div className="card" style={{width: "15rem", textAlign: "center"}} onClick={() => (props.flipCard(props.obj))} >
            <div className="card-body">
                <h5 className="card-title">{props.category}</h5>
                {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
                <p className="card-text">{props.value}</p>
                {/* <a href="#" class="card-link">Card link</a>
                <a href="#" class="card-link">Another link</a> */}
            </div>    
        </div>
    )
}

export default CardFront