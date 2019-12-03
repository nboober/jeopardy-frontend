import React from 'react';
import Row from './Row'

let Game = (props) => {
    console.log(props)
    return (
        <div>
            <h3>game cards here
            </h3>
            <table>
                <tr>
                    <th>{props.catTitles[0]}</th>
                    <th>{props.catTitles[1]}</th>
                    <th>{props.catTitles[2]}</th>
                    <th>{props.catTitles[3]}</th>
                    <th>{props.catTitles[4]}</th>
                </tr>

            {props.val200.map(question => {

                return <tr><Row key={question.category.id} questionData={question} /></tr>})

            }
            {props.val400.map(question => {

                return <tr><Row key={question.category.id} questionData={question} /></tr>})

            }
            {props.val600.map(question => {

                return <tr><Row key={question.category.id} questionData={question} /></tr>})

            }
            {props.val800.map(question => {

                return <tr><Row key={question.category.id} questionData={question} /></tr>})

            }
            {props.val1000.map(question => {

                return <tr><Row key={question.category.id} questionData={question} /></tr>})

            }

            </table>

        </div>
    )
}

export default Game 