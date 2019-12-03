import React from 'react';
import './App.css';
import Game from './Components/Game'
import User from './Components/User'

class App extends React.Component {

  constructor(){
    super()
    this.state={
      questionsArray: []
    }
  }


componentDidMount(){
  fetch('https://opentdb.com/api.php?amount=50')
  .then(questionData => questionData.json())
  .then(questionArray => {
    this.setState({
      questionsArray: questionArray.results
    })
  })
  }
 
  render(){
    return (
      <div>
        <h1>Jeopardy!</h1>
          <Game questions={this.state.questionsArray}/>
          <User/>
      </div>
      );
  }
 
}

export default App;
