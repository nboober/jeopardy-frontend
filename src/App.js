import React from 'react';
import './App.css';
import Game from './Containers/Game'
import User from './Components/User'
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';
import LoginForm from './Components/LoginForm';

class App extends React.Component {

  constructor(){
    super()
    this.state={
      questionsArray: [],
      showBack: []
      user: false
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
  login = (event) => {
    event.preventDefault()
    console.log('logging in')
    this.setState({
      user: true
    })
    // get info from input form
    // update state so user is current user
    // render game component
  }
 
  render(){
    let login = this.state.user
    if (login === false) {
      return  <LoginForm login={this.login}/>
    }else{
      return (
        <div>
          <h1>Jeopardy!</h1>
          <Game questions={this.state.questionsArray}/>
          <User/>
        </div>
        );
    }

   
  }
 
}

export default App;
