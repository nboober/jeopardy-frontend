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
      username: "",
      password: "",
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
  let welcome = new Audio('Welcome.mp3')
  welcome.play()
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
    // console.log(sortedArray)

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
  
  collectLogin = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  } 

  login = (event) => {
    event.preventDefault()
    let username = this.state.username
    let password = this.state.password.toString()
    console.log(username)
    console.log(password)
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({username: username, password: password})
    })
    .then(res => res.json())
      .then(userObj => {
        if(userObj){
          this.setState({
            user: true,
            username: userObj.username,
            password: ""
          })
          this.welcomeAudio()
        }else{
          alert("Please Enter a Valid Login")
        }
      })
  }
  
  welcomeAudio = () => {
    console.log('welcome logic here')
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

      if(this.state.userAnswer.length <= 2){

        alert("Your answer must be greater than 2 characters")

      }else{

        this.evalAnswer()
        this.setState({
          userAnswer: "",
          currentQ: null,
          needToAnswer: false
        })

      }

    }
  }

  componentDidUpdate = () => {
    // Finish Game Conditional
    if(this.state.questionsAnswered === 0){
      alert("Game Over, Your Final Score is " + this.state.userScore)
      window.location.reload()
    }
  }
 
  render(){
    let login = this.state.user
    if (login === false) {
      return  <LoginForm 
              username={this.state.username} 
              password={this.state.password} 
              login={this.login} 
              collect={this.collectLogin}
              className="container" 
              style={{textAlign: "center"}}/>
    }else{
      return (
        <div style={{textAlign: "center", height: "100vh", backgroundImage: "linear-gradient(to left bottom, #051937, #331a4c, #66004b, #900033, #a40101)", color: "white"}}>
          <h1 className="title-font">Jeopardy!</h1>
          <User score={this.state.userScore} username={this.state.username}/>
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
