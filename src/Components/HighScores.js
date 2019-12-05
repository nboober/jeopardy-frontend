import React from 'react'

class HighScores extends React.Component{
    render(){
        return(
            <div>

                <h1>
                    {this.props.game.highscore}
                </h1>

                <p>
                    Acheived on: {this.props.game.created_at}
                </p>

            </div>
        )
    }
}

export default HighScores