import React from 'react';
import Row from '../Components/Row'
import User from '../Components/User'
import AnswerInput from '../Components/AnswerInput'
import {Link} from 'react-router-dom'


let Game = (props) => {
console.log(props)
    return (
        <div className="container col-lg" style={{margin: "0 auto"}}>
            
            <Link to="/" onClick={props.logout} >Logout</Link>

            <h1 className="title-font" style={{color: "#FBCA76"}}>Jeopardy!</h1>
            
            <User score={props.score} username={props.username} logout={props.logout}/>

            <AnswerInput 
            submitAnswer={props.submitAnswer}
            answer={props.answer} 
            userAnswer={props.userAnswer}/>

            <Row difficulty={props.easy}
             cardSide={props.cardSide}
             flipCard={props.flipCard}/>

            <Row  difficulty={props.medium}
             cardSide={props.cardSide}
             flipCard={props.flipCard}/>
            
            <Row  difficulty={props.hard}
             cardSide={props.cardSide}
             flipCard={props.flipCard}/> 
        </div>
    )
}

export default Game 