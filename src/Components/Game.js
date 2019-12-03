import React from 'react';
import Card from './Card'

let Game = (props) => {
    console.log(props)
    return (
        <div className="container">
            
                    {props.questions.map(question => {
                       return <Card 
                                cardSide={props.cardSide} 
                                question={question} 
                                key={question.question} 
                                flipCard={props.flipCard}
                                />
                    })}

        </div>
    )
}

export default Game 