import React from 'react';

const CardBack = (props) => {
    return (
        <div className="card card-font" style={{width: "16rem", height: "16rem", textAlign: "center", margin: "14px", backgroundColor: "#1400BC"}} >
            <div className="card-body">
                <h5 className="card-title">
                    {props.question.question.replace(/(&quot;|&#039;|&|acute;|amp;|;)/g, '')}
                </h5>
            </div>    
        </div>
    )
}

export default CardBack