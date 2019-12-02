import React from 'react';
import Column from './Column'

let Game = (props) => {
    return (
        <div>
        <h3>game cards here
        </h3>
        <Column 
        cat1={props.cat1} 
        cat2={props.cat2} 
        cat3={props.cat3} 
        cat4={props.cat4}
        cat5={props.cat5}
        />
        </div>
    )
}

export default Game 