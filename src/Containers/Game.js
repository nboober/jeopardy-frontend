import React from 'react';
import Card from './Card'
import User from '../Components/User'
import AnswerInput from '../Components/AnswerInput'
import {Link} from 'react-router-dom'


let Game = (props) => {

    return (
        <div className="container col-lg" style={{margin: "0 auto"}}>
            
            <Link to="/" onClick={props.logout} >Logout</Link>

            <h1 className="title-font" style={{color: "#FBCA76"}}>Jeopardy!</h1>
            
            <User score={props.score} username={props.username} logout={props.logout}/>

            <AnswerInput 
            submitAnswer={props.submitAnswer}
            answer={props.answer} 
            userAnswer={props.userAnswer}/>

            <div className="row">
                {props.questions.map(question => {
                    return <Card 
                        cardSide={props.cardSide} 
                        question={question} 
                        key={question.question} 
                        flipCard={props.flipCard}/>
                    }
                )}
            </div>
        </div>
    )
}

export default Game 