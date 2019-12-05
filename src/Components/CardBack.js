import React from 'react';

let CardBack = (props) => {
    // console.log(props)
    return (
        <div className="card card-font" style={{width: "16rem", height: "16rem", textAlign: "center", margin: "14px", backgroundColor: "#1400BC"}} >
            <div className="card-body">
                <h5 className="card-title">
                    {props.question.replace(/(&quot;|&#039;|&|acute;|amp;|;)/g, '')}
                    {props.question.type === "multiple" ? (
                        props.question.incorrect_answers.map(answer => {
                            return <p>{answer}</p>
                        })
                    ): null }
                </h5>
            </div>    
        </div>
    )
}

export default CardBack