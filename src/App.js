import React, { Component } from 'react';
import Category from './components/Category'
import './App.css';
import * as ReadableAPI from './utils/ReadableAPI'
import { Link, Route } from 'react-router-dom'

class App extends Component {

  state = {
    categories: []
  }

  componentDidMount() {
    //TODO: convert to using store for this:
    ReadableAPI.getAllCategories()
    .then(categories => this.setState({categories: categories}));
  }
  render() {
    let categories = this.state.categories;
    return (
      <div className="App">
        <Route exact path='/' render={() => (<h1>Home</h1>)}/>
        <Link to='/'>To Home</Link>
        <li>
          {categories.map(category => {
            return (<ul><Link to={'/' + category.path}>To {category.path}</Link></ul>)
          })}
        </li>
        {categories.map(category => {
          return (<Category name={category.name} path={category.path}></Category>)
        })}
      </div>
    );
  }
}
//<Link to='/testCategory'>To test category</Link>
export default App;
