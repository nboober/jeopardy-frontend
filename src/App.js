import React from 'react';
import './App.css';
import Game from './Components/Game'
import User from './Components/User'

class App extends React.Component {

  constructor(){
    super()
    this.state={
      response: [],
      catTitles: [],
      val200: [],
      val400: [],
      val600: [],
      val800: [],
      val1000: []
    }
  }


componentDidMount(){
  let offset = Math.floor(Math.random()*100 + 1)
  // let offset = 0;
  // console.log(offset)
  fetch(`http://jservice.io/api/categories?count=5&offset=${offset}`)
  .then(res=>res.json())
  .then(cat => {
    
   let ids = cat.map(c=> c.id)
   let titles = cat.map(c=>c.title)
  //  console.log(titles)
   this.setState({
     catTitles: titles
   })

   ids.map(id => {
     fetch(`http://jservice.io/api/clues?category=${id}`)
     .then(res=>res.json())
     .then(cat => {
      
       this.setState({
       response: [...this.state.response, cat.slice(0,5)]
       }, this.setRows)
    
    }
   )
  })})
}

setRows = () => {

  // let questions = this.state.response.map(questionArray => questionArray.filter(question => question.value === 200))
let v200 = this.state.response.map(questionArray => questionArray.filter(question => question.value === 200))
let final200Array = [];
v200.forEach(array => final200Array.push(array[0]))
// console.log(final200Array)

  // let questions = this.state.response.map(questionArray => questionArray.filter(question => question.value === 400))
let v400 = this.state.response.map(questionArray => questionArray.filter(question => question.value === 400))
let final400Array = [];
v400.forEach(array => final400Array.push(array[0]))
// console.log(final400Array)

  // let questions = this.state.response.map(questionArray => questionArray.filter(question => question.value === 600))
let v600 = this.state.response.map(questionArray => questionArray.filter(question => question.value === 600))
let final600Array = [];
v600.forEach(array => final600Array.push(array[0]))
// console.log(final600Array)

  // let questions = this.state.response.map(questionArray => questionArray.filter(question => question.value === 800))
let v800 = this.state.response.map(questionArray => questionArray.filter(question => question.value === 800))
let final800Array = [];
v800.forEach(array => final800Array.push(array[0]))
// console.log(final800Array)

// let questions = this.state.response.map(questionArray => questionArray.filter(question => question.value === 1000))
let v1000 = this.state.response.map(questionArray => questionArray.filter(question => question.value === 1000))
let final1000Array = [];
v1000.forEach(array => final1000Array.push(array[0]))
// console.log(final1000Array)

  // console.log(questions)

  // console.log(this.state.response)

  this.setState({
    val200: final200Array,
    val400: final400Array,
    val600: final600Array,
    val800: final800Array,
    val1000: final1000Array
    
  })
}
 
  render(){
    // {console.log(this.state.response)}
    {console.log(this.state.val200)}
    // {console.log(this.state.val400)}
    return (
      <div>
        <h1>Jeopardy!</h1>
          <Game 
          catTitles={this.state.catTitles}
          val200={this.state.val200} 
          val400={this.state.val400} 
          val600={this.state.val600} 
          val800={this.state.val800} 
          val1000={this.state.val1000}
          // questionData = {this.state.response}
          />
          <User/>
      </div>
      );
  }
 
}

export default App;
