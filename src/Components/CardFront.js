import React from 'react';

let CardFront = (props) => {
// console.log(props)

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
        <div className="card card-font" style={{width: "16rem", height: "16rem", textAlign: "center", margin: "14px", backgroundColor: "#1400BC"}} onClick={() => (props.flipCard(props.obj))} >
            <div className="card-body">
                <h5 className="card-title" style={{fontSize: "2rem"}}>{props.category}</h5>
                <p className="card-text" style={{fontSize: "1.5rem", color: "red"}}>{value}</p>
            </div>    
        </div>
    )
}

export default CardFront