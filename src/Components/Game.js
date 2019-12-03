import React from 'react';
import Row from './Row'

let Game = (props) => {
    console.log(props)
    return (
        <div>
            <h3>game cards here
            </h3>
            <table>
                <thead>
                    <tr>
                        <th>{}</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {props.questions.map(question => {
                        return <Row question={question} />
                    })}

                </tbody>

            </table>

        </div>
    )
}

export default Game 