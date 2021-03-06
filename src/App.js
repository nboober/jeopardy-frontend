import React from 'react';
import './App.css';
import Game from './Containers/Game'
import Profile from './Components/Profile'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './Components/LoginForm';
import Swal from 'sweetalert2'
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
      easyQ: [],
      mediumQ: [],
      hardQ: [],
      questionsArray: [],
      showBack: [],
      user: false,
      currentQ: null,
      needToAnswer: false,
      userAnswer: "",
      userScore: 0,
      questionsRemaining: 15,
      audio: true
    }
    this.welcome = new Audio(welcome)
    this.wrongAnswer = new Audio(wrong)
    this.rightAnswer = new Audio(right)
  }

componentDidMount(){
  fetch('https://opentdb.com/api.php?amount=50')
  .then(questionData => questionData.json())
  .then(questionArray => {
    this.setState({
      questionsArray: questionArray.results
    })
    this.playWelcome()
    this.easyQ()
    this.mediumQ()
    this.hardQ()
    // console.log(this.state.questionsArray)
  })
  }

  easyQ = () =>{
    let easy = this.state.questionsArray.filter(q => q.difficulty === 'easy')
    let easyF = easy.slice(0,5)
    this.setState({
      easyQ: easyF
    })
  }
  mediumQ = () =>{
    let medium = this.state.questionsArray.filter(q => q.difficulty === 'medium')
    let mediumF = medium.slice(0,5)
    this.setState({
      mediumQ: mediumF
    })
  }
  hardQ = () =>{
    let hard = this.state.questionsArray.filter(q => q.difficulty === 'hard')
    let hardF = hard.slice(0,5)
    this.setState({
      hardQ: hardF
    })
  }

  playWelcome = () => {
    Swal.fire({
      title: "How To Login",
      text: "Login with the following credentials: \n username: nick , password: password",
      icon: "info",
      button: "Ok"
    });
    if (this.state.audio === true) {this.welcome.play()} 
  }

  flipCard = (obj) => {
    if(this.state.needToAnswer){

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "You need to answer the previous question first before moving on..."
      })

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
    fetch("https://jeopardy-back.herokuapp.com/login", {
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
            user: userObj,
            username: userObj.username,
            password: "",
            audio: false
          },()=>{this.fetchUser()})
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Please Enter a Valid Login"
          })
        }
      })
  }

  fetchUser = () => {
    let user_id = this.state.user.id;
    fetch(`https://jeopardy-back.herokuapp.com/users/${user_id}`)
    .then(response => response.json())
    .then(userObj => {
      this.setState({
        user: userObj
      })
    })
  }

  logout = () => {
    window.location.reload()
  }

  answer = (event) => {
    // console.log(event.target.value)
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
      Swal.fire({
        icon: 'success',
        title: 'Correct!',
        text: `The Right Answer is: ${this.state.currentQ.correct_answer}`
      })
    }else{
      this.wrongAnswer.play()
      this.wrong()
      Swal.fire({
        icon: 'error',
        title: 'So Sorry!',
        text: `The Right Answer is: ${this.state.currentQ.correct_answer}`
      })
    }
  }

  submitAnswer = (event) => {
    event.preventDefault()
    if (this.state.currentQ === null){
      
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Choose a Question First"
      })

      

    }else{

      if(this.state.userAnswer.length < 1){

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Please enter an answer"
        })

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

      Swal.fire({
        icon: 'success',
        title: 'Game Completed',
        text: "Your Final Score is " + this.state.userScore + ".\n You will be logged out in 5 seconds"
      })

      fetch('https://jeopardy-back.herokuapp.com/games',{
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

      setTimeout(function(){

        window.location.reload()

      }, 5000)
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
                  cardSide={this.state.showBack}
                  easy={this.state.easyQ}
                  medium={this.state.mediumQ}
                  hard={this.state.hardQ}/>
            }}/>

          </div>
        </BrowserRouter>
      );
    } 
  }

export default App;
