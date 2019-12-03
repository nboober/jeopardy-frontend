import React from 'react';

let CardBack = (props) => {
    // console.log(props)
    return (
        <div className="card col" style={{width: "18rem", textAlign: "center"}} >
            <div className="card-body">
                <h5 className="card-title">{props.question}</h5>
                {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
                {/* <p className="card-text">{props.value}</p> */}
                {/* <a href="#" class="card-link">Card link</a>
                <a href="#" class="card-link">Another link</a> */}
            </div>    
        </div>
    )
}

export default CardBack