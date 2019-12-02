import React from 'react';
import './App.css';
import Game from './Components/Game'
import User from './Components/User'

class App extends React.Component {

  constructor(){
    super()
    this.state={
      response: [],
      cat1: [],
      cat2: [],
      cat3: [],
      cat4: [],
      cat5: [],
    }
  }


componentDidMount(){
  let offset = Math.floor(Math.random()*100 + 1)
  console.log(offset)
  fetch(`http://jservice.io/api/categories?count=5&offset=${offset}`)
  .then(res=>res.json())
  .then(cat => {
   let ids = cat.map(c=> c.id)
   ids.map(id => {
     fetch(`http://jservice.io/api/clues?category=${id}`)
     .then(res=>res.json())
     .then(cat => {
       this.setState({
       response: [...this.state.response, cat]
       })
      this.setCategories()
    }
   )
  })})
}

setCategories = () => {
  this.setState({
    cat1: this.state.response[0],
    cat2: this.state.response[1],
    cat3: this.state.response[2],
    cat4: this.state.response[3],
    cat5: this.state.response[4]
  })
}
 
  render(){
    return (
      <div>
        <h1>Jeopardy!</h1>
          <Game 
          cat1={this.state.cat1} 
          cat2={this.state.cat2} 
          cat3={this.state.cat3} 
          cat4={this.state.cat4} 
          cat5={this.state.cat5}
          />
          <User/>
      </div>
      );
  }
 
}

export default App;
