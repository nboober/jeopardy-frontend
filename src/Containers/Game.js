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
                       return <Card question={question} key={question.question} />
                    })}

            </div>

        </div>
    )
}

export default Game 