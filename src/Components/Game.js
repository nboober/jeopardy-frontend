import React from 'react';
import Column from './Column'

let Game = (props) => {
    // console.log(props.qData)
    return (
        <div>
    
        {props.qData.map(q => console.log(q))}
    
        </div>
    )
}

export default Game 