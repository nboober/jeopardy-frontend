import React from 'react';
import './App.css';
import Game from './Containers/Game'
import User from './Components/User'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './Components/LoginForm';
import AnswerInput from './Components/AnswerInput'

class App extends React.Component {

  constructor(){
    super()
    this.state={
      questionsArray: [],
      showBack: [],
      user: false,
      currentQ: null,
      userAnswer: "",
      userScore: 0
    }
  }


componentDidMount(){
  fetch('https://opentdb.com/api.php?amount=25')
  .then(questionData => questionData.json())
  .then(questionArray => {
    this.setState({
      questionsArray: questionArray.results
    })
  })
  }

  flipCard = (obj) => {
    this.setState({
      showBack: [...this.state.showBack, obj],
      currentQ: obj
    })
  }

  login = (event) => {
    event.preventDefault()
    this.setState({
      user: true
    })
  }

  answer = (event) => {
    this.setState({
      userAnswer: event.target.value
    })
  }

  setScore = () => {
    let score = this.state.currentQ.difficulty
    // switch()
    console.log(score)
  }
  evalAnswer = () => {
    let correctAnswer = this.state.currentQ.correct_answer.toLowerCase()
    let userAnswer = this.state.userAnswer.toLowerCase()
    if(correctAnswer.includes(userAnswer)){
      alert("You are Correct!")
    }else{
      alert("Ha You Dumbass!")
    }
    this.setScore()
  }

  submitAnswer = (event) => {
    event.preventDefault()
    if (this.state.currentQ === null){
      alert("Choose a Question First")
    }else{
      this.evalAnswer()
      this.setState({
        userAnswer: "",
        currentQ: null
      })
    }
  }
 
  render(){
    let login = this.state.user
    if (login === false) {
      return  <LoginForm login={this.login} className="container" style={{textAlign: "center"}}/>
    }else{
      return (
        <div style={{textAlign: "center"}}>
          <h1>Jeopardy!</h1>
          <User score={this.state.userScore}/>
          <AnswerInput submitAnswer={this.submitAnswer} answer={this.answer} userAnswer={this.state.userAnswer}/>
          <Game questions={this.state.questionsArray} flipCard={this.flipCard} cardSide={this.state.showBack}/>
        </div>
        );
    }

   
  }
 
}

export default App;
