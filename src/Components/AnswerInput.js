import React from 'react';

let AnswerInput = (props) => {
    return (
        <div>
            <form onSubmit={props.submitAnswer}>
                <input type='text' placeholder='Your Answer Here' value={props.userAnswer} onChange={props.answer}/>
                <input type='submit' value='Submit'/>
            </form>
        </div>
    )
}

export default AnswerInput