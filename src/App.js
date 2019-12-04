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
    this.sortByDifficulty()
  })
  }

  sortByDifficulty = () =>{

    function compare(a, b) {
      const diffA = a.difficulty;
      const diffB = b.difficulty;
    
      let comparison = 0;
      if (diffA === "easy" && diffB === "medium") {
        comparison = -1;
      }else if(diffA === "easy" && diffB === "hard"){
        comparison = -1;
      } else if (diffA === "medium" && diffB === "easy"){
        comparison = 0;
      }else if (diffA === "medium" && diffB === "hard") {
        comparison = 0;
      } else if (diffA === "hard" && diffB === "medium"){
        comparison = 2;
      }else if (diffA === "hard" && diffB === "easy"){
        comparison = 2;
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
 
  correct = () => {
    let money = this.state.currentQ.difficulty
    money === 'easy' ? (
      this.setState({
        userScore: this.state.userScore + 250
      })
    ) : (
      money === 'medium' ? (
        this.setState({
          userScore: this.state.userScore + 500
        })
      ) : (
       this.setState({
        userScore: this.state.userScore + 1000
       })
      )
    )
  }

  wrong = () => {
    let money = this.state.currentQ.difficulty
    money === 'easy' ? (
      this.setState({
        userScore: this.state.userScore - 250
      })
    ) : (
      money === 'medium' ? (
        this.setState({
          userScore: this.state.userScore - 500
        })
      ) : (
       this.setState({
        userScore: this.state.userScore - 1000
       })
      )
    )
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
