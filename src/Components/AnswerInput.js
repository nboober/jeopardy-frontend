import React from 'react';

let AnswerInput = (props) => {
    
    return (
        <div>
            <form onSubmit={props.submitAnswer}>
            <div className="row d-flex justify-content-center ">
                <input className="form-control col-sm-5" type='text' placeholder='Your Answer Here' value={props.userAnswer} onChange={props.answer}/>
                <input className="btn btn-warning col-sm-2" type='submit' value='Submit'/>
            </div>
            </form>
        </div>
    )
}

export default AnswerInput