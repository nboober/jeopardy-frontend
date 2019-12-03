import React from 'react';
import Card from './Card'

let Game = (props) => {
    return (
        <div className="container">

            <div className="row">
            
                    {props.questions.map(question => {
                       return <Card 
                                cardSide={props.cardSide} 
                                question={question} 
                                key={question.question} 
                                flipCard={props.flipCard}
                                />
                    })}

            </div>

        </div>
    )
}

export default Game 