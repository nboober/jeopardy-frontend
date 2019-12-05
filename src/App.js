import React from 'react';
import './App.css';
import Game from './Containers/Game'
import Profile from './Components/Profile'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './Components/LoginForm';
import welcome from './welcome.mp3'
import wrong from './wrongAnswer.mp3'
import right from './rightAnswer.mp3'
import {BrowserRouter, Route, Redirect} from 'react-router-dom'

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
      questionsRemaining: 25
    }
    this.welcome = new Audio(welcome)
    this.wrongAnswer = new Audio(wrong)
    this.rightAnswer = new Audio(right)
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
    // console.log(username)
    // console.log(password)
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
          this.welcome.play()
          this.setState({
            user: userObj,
            username: userObj.username,
            password: ""
          },()=>{this.fetchUser()})

        }else{
          alert("Please Enter a Valid Login")
        }
      })
  }

  fetchUser = () => {
    let user_id = this.state.user.id;
    fetch(`http://localhost:3000/users/${user_id}`)
    .then(response => response.json())
    .then(userObj => {
      this.setState({
        user: userObj
      })
    })
  }

  logout = () => {
    // this.setState({
    //   username: "",
    //   password: "",
    //   user: false
    // })
    window.location.reload()
  }

  answer = (event) => {

    console.log(event.target.value)
    this.setState({
      userAnswer: event.target.value
    })
  }
 
  correct = () => {
    let money = this.state.currentQ.difficulty
    money === 'easy' ? (
      this.setState({
        userScore: this.state.userScore + 250,
        questionsRemaining: --this.state.questionsRemaining
      })
    ) : (
      money === 'medium' ? (
        this.setState({
          userScore: this.state.userScore + 500,
          questionsRemaining: --this.state.questionsRemaining
        })
      ) : (
       this.setState({
        userScore: this.state.userScore + 1000,
        questionsRemaining: --this.state.questionsRemaining
       })
      )
      )
  }

  wrong = () => {
    let money = this.state.currentQ.difficulty
    money === 'easy' ? (
      this.setState({
        userScore: this.state.userScore - 250,
        questionsRemaining: --this.state.questionsRemaining
      })
    ) : (
      money === 'medium' ? (
        this.setState({
          userScore: this.state.userScore - 500,
          questionsRemaining: --this.state.questionsRemaining
        })
      ) : (
       this.setState({
        userScore: this.state.userScore - 1000,
        questionsRemaining: --this.state.questionsRemaining
       })
      )
    )
  }

  evalAnswer = () => {
    let correctAnswer = this.state.currentQ.correct_answer.toLowerCase()
    let userAnswer = this.state.userAnswer.toLowerCase()
    if(correctAnswer.includes(userAnswer)){
      this.rightAnswer.play()
      this.correct()
    }else{
      this.wrongAnswer.play()
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
    if(this.state.questionsRemaining === 0){
      alert("Game Over, Your Final Score is " + this.state.userScore)

      fetch('http://localhost:3000/games',{
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({ game: {
          highscore: this.state.userScore,
          user_id: this.state.user.id
        }
          
        })
      })
      .then(response => response.json())
      .then(newGame => {
        console.log(newGame)
      })
      window.location.reload()
    }
  }
 
  render(){
    let login = this.state.user
    
      return (
        <BrowserRouter>
          <div style={{textAlign: "center", backgroundImage: "linear-gradient(to left bottom, #051937, #331a4c, #66004b, #900033, #a40101)", color: "white"}}>
            
            {login === false ? <Redirect to="/" /> : (
              <Redirect to="/game" />
            )}

            <Route exact path="/" render={() => {
                    return  <LoginForm 
                              username={this.state.username} 
                              password={this.state.password} 
                              login={this.login} 
                              collect={this.collectLogin}
                              className="container" 
                              style={{textAlign: "center"}}/>
            }} />
            
            <Route exact path="/profile" render = {()=>{
              return <Profile
                      logout={this.logout}
                      user={this.state.user}
                      />
            }} />

            <Route exact path="/game" render={()=>{

              return <Game 
                  logout={this.logout}
                  score={this.state.userScore}
                  username={this.state.username}
                  answer={this.answer}
                  submitAnswer={this.submitAnswer}
                  userAnswer={this.state.userAnswer}
                  questions={this.state.questionsArray} 
                  flipCard={this.flipCard} 
                  cardSide={this.state.showBack}/>
            }}/>

          </div>
        </BrowserRouter>
      );
    } 
  }

export default App;
