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
      needToAnswer: false,
      userAnswer: "",
      userScore: 0,
      questionsAnswered: 5
    }
  }

componentDidMount(){
  fetch('https://opentdb.com/api.php?amount=5')
  .then(questionData => questionData.json())
  .then(questionArray => {
    this.setState({
      questionsArray: questionArray.results
    })
    this.sortByDifficulty()
  })
  }

  sortByDifficulty = () =>{

    function compare(a, b) {
      const diffA = a.difficulty;
      const diffB = b.difficulty;
    
      // Trying to sort medium to hard
      // if (diffA === "easy" && diffB === "medium") {
      //   comparison = -1;
      // }else if(diffA === "easy" && diffB === "hard"){
      //   comparison = -1;
      // } else if (diffA === "medium" && diffB === "easy"){
      //   comparison = 0;
      // }else if (diffA === "medium" && diffB === "hard") {
      //   comparison = 0;
      // } else if (diffA === "hard" && diffB === "medium"){
      //   comparison = 2;
      // }else if (diffA === "hard" && diffB === "easy"){
      //   comparison = 2;
      // }

      let comparison = 0;
      if (diffA > diffB) {
        comparison = 1;
      } else if (diffA < diffB) {
        comparison = -1;
      }
      return comparison;
    }
    
    let sortedArray = this.state.questionsArray.sort(compare)
    console.log(sortedArray)

    this.setState({
      questionsArray: sortedArray
    })
  }

  flipCard = (obj) => {
    if(this.state.needToAnswer){
      alert("You need to answer the previous question first before moving on...")
    }else{

      this.setState({
        needToAnswer: true,
        showBack: [...this.state.showBack, obj],
        currentQ: obj
      })

    }
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
 
  correct = () => {
    let money = this.state.currentQ.difficulty
    money === 'easy' ? (
      this.setState({
        userScore: this.state.userScore + 250,
        questionsAnswered: --this.state.questionsAnswered
      })
    ) : (
      money === 'medium' ? (
        this.setState({
          userScore: this.state.userScore + 500,
          questionsAnswered: --this.state.questionsAnswered
        })
      ) : (
       this.setState({
        userScore: this.state.userScore + 1000,
        questionsAnswered: --this.state.questionsAnswered
       })
      )
      )
      this.finishGame()
  }

  wrong = () => {
    let money = this.state.currentQ.difficulty
    money === 'easy' ? (
      this.setState({
        userScore: this.state.userScore - 250,
        questionsAnswered: --this.state.questionsAnswered
      })
    ) : (
      money === 'medium' ? (
        this.setState({
          userScore: this.state.userScore - 500,
          questionsAnswered: --this.state.questionsAnswered
        })
      ) : (
       this.setState({
        userScore: this.state.userScore - 1000,
        questionsAnswered: --this.state.questionsAnswered
       })
      )
    )
    this.finishGame()
  }

  evalAnswer = () => {
    let correctAnswer = this.state.currentQ.correct_answer.toLowerCase()
    let userAnswer = this.state.userAnswer.toLowerCase()
    if(correctAnswer.includes(userAnswer)){
      this.correct()
    }else{
      this.wrong()
    }
  }

  submitAnswer = (event) => {
    event.preventDefault()
    if (this.state.currentQ === null){
      alert("Choose a Question First")
    }else{
      this.evalAnswer()
      this.setState({
        userAnswer: "",
        currentQ: null,
        needToAnswer: false
      })
    }
  }

  finishGame = () => {
    if(this.state.questionsAnswered === 0){
      alert("Game Over, Your Final Score is " + this.state.userScore)
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
          <AnswerInput 
          submitAnswer={this.submitAnswer}
          answer={this.answer} 
          userAnswer={this.state.userAnswer}/>
          <Game 
          questions={this.state.questionsArray} 
          flipCard={this.flipCard} 
          cardSide={this.state.showBack}/>
        </div>
      );
    } 
  }
}

export default App;
