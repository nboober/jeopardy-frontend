import React from 'react';
import Card from './Card'

let Game = (props) => {
    return (
        <div>
            <h3>game cards here
            </h3>
                    {props.questions.map(question => {
                       return <Card question={question} key={question.question} />
                    })}

        </div>
    )
}

export default Game 