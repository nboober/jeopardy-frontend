import React from 'react'
import HighScores from './HighScores'
import {Link} from 'react-router-dom'

class Profile extends React.Component{
    constructor(){
        super()
        this.state={
            games: []
        }
    }

    componentDidMount = () => {
        this.topScores()
    }

     compare = (a, b) => {
        const ScoreA = a.highscore;
        const ScoreB = b.highscore;
  
        let comparison = 0;
        if (ScoreA > ScoreB) {
          comparison = -1;
        } else if (ScoreA < ScoreB) {
          comparison = 1;
        }
        return comparison;
      }

      topScores = () => {
          let top3 = this.props.user.games.sort(this.compare).slice(0,3)
          console.log(top3)
          this.setState({
              games: top3
          })
      }

    render(){
        return(
            <div style={{height: "100vh"}}>
                <Link to="/" onClick={this.props.logout}>Logout</Link>
                <br/>
                <Link to="/game" >Back To Game</Link>

                <h1>{this.props.user.name}'s Profile</h1>
                <br/>

                <h2>Top 3 High Scores</h2>
                <br/>

                <div>
                {this.state.games.map(game => {
                    // console.log(game)
                    return <HighScores key={game.id} game={game}/>
                })}
                </div>

            </div>
        )
    }
}

export default Profile