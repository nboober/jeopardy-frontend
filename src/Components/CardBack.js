import React from 'react';

let CardBack = (props) => {
    return (
        <div className="card col" style={{width: "18rem", textAlign: "center"}} >
            <div className="card-body">
                <h5 className="card-title">{props.question.replace(/(&quot;|&#039;|&|acute;|amp;|;)/g, '')}</h5>
                {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
                {/* <p className="card-text">{props.value}</p> */}
                {/* <a href="#" class="card-link">Card link</a>
                <a href="#" class="card-link">Another link</a> */}
            </div>    
        </div>
    )
}

export default CardBack