import React from 'react';
import './App.css';
import Game from './Components/Game'
import User from './Components/User'

class App extends React.Component {

  constructor(){
    super()
    this.state={
      response: [],
    }
  }


componentDidMount(){
 fetch('https://opentdb.com/api.php?amount=50')
 .then(res=>res.json())
 .then(q => this.setState({
   response: q.results
 }))
}


 
  render(){
    return (
      <div>
        <h1>Jeopardy!</h1>
         <Game qData={this.state.response} />
          <User/>
      </div>
      );
  }
 
}

export default App;
