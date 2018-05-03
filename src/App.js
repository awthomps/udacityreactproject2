import React, { Component } from 'react';
import Category from './components/Category'
import './App.css';
import { Link, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Category path='testCategory'></Category>
        <Route exact path='/' render={() => (<div>
          <Link to='/testCategory'>To test category</Link>
        </div>)}/>
      </div>
    );
  }
}

export default App;
