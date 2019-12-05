import React from 'react';

let AnswerInput = (props) => {
    
    return (
        <div>
            <form onSubmit={props.submitAnswer}>
            <div className="row d-flex justify-content-center ">
                <span style={{fontSize: "25px", fontWeight: "bold", paddingRight: "10px"}}>What is </span> 
                <input className="form-control col-sm-3" type='text' placeholder='Your Answer Here' value={props.userAnswer} onChange={(event)=>props.answer(event)}/>
                <input className="btn btn-warning col-sm-1" type='submit' value='Submit'/>
            </div>
            </form>
        </div>
    )
}

export default AnswerInput