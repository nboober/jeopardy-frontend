import React from 'react';
import Card from '../Containers/Card'

let Row = (props) => {
    // console.log(props)
    return (
        <div className="row" >
        {props.difficulty.map(question => {
            return <Card 
                cardSide={props.cardSide} 
                question={question} 
                key={question.question} 
                flipCard={props.flipCard}/>
            }
        )}
    </div>
    )
}

export default Row