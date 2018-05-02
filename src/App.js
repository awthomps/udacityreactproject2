import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Readable</h1>
        </header>
        <Route path='/testcategory' render={() => (<div>
          <Link to='/'>To Home</Link>
        </div>)}/>
        <Route exact path='/' render={() => (<div>
          <Link to='/testcategory'>To Test Catagory</Link>
        </div>)}/>
      </div>
    );
  }
}

export default App;
