import React from 'react';
import './App.css';
import Game from './Components/Game'
import User from './Components/User'
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';

class App extends React.Component {

  constructor(){
    super()
    this.state={
      questionsArray: [],
      showBack: []
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

  flipCard = (obj) => {
    console.log(obj)
    this.setState({
      showBack: [...this.state.showBack, obj]
    })
  }
 
  render(){
    return (
      <div>
        <h1>Jeopardy!</h1>
          <Game questions={this.state.questionsArray} flipCard={this.flipCard} cardSide={this.state.showBack}/>
          <User/>
      </div>
      );
  }
 
}

export default App;
