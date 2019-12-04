import React from 'react';

let CardBack = (props) => {
    
    return (
        <div className="card" style={{width: "11rem", height: "11rem", overflowY: "scroll", textAlign: "center"}} >
            <div className="card-body">
                <h5 className="card-title">
                    {props.question.replace(/(&quot;|&#039;|&|acute;|amp;|;)/g, '')}
                </h5>
            </div>    
        </div>
    )
}

export default CardBack