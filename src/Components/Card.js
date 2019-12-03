import React from 'react';
import CardFront from './CardFront'
import CardBack from './CardBack';

let Card = (props) => {
    return (
        <div>
              <CardFront 
       category={props.question.category} 
       value={props.question.difficulty}/>
        <CardBack question={props.question.question}/>
        </div>
     
    )
}

export default Card