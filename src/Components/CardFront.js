import React from 'react';

let CardFront = (props) => {
console.log(props)

    let difficulty = props.value;
    let value;
    switch(difficulty){
        case "easy":
            value = "250 points";
        break;

        case "medium":
            value = "500 points";
        break;

        case "hard":
            value = "1000 points";
        break;
    }

    return (
        <div className="card" style={{width: "11rem", height: "11rem", textAlign: "center"}} onClick={() => (props.flipCard(props.obj))} >
            <div className="card-body">
                <h5 className="card-title">{props.category}</h5>
                <p className="card-text">{value}</p>
            </div>    
        </div>
    )
}

export default CardFront