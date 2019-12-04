import React from 'react';
import CardFront from './CardFront'
import CardBack from './CardBack';


let Card = (props) => {
    
    return (
        <div>
            {props.cardSide.includes(props.question) ? (
                <CardBack question={props.question.question}/>
                ) : (
                    <CardFront 
                        obj={props.question}
                        flipCard = {props.flipCard}
                        category={props.question.category} 
                        value={props.question.difficulty}/>
            )}
        </div>
    )
}

export default Card