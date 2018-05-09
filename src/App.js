import React, { Component } from 'react';
import Category from './components/Category'
import './App.css';
import * as ReadableAPI from './utils/ReadableAPI'
import { Link, Route } from 'react-router-dom'
import { setCategories } from './actions/category.actions'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {

  state = {
  }

  componentDidMount() {
    //TODO: convert to using store for this:
    ReadableAPI.getAllCategories()
    .then(categories => this.props.setCategories(categories));
  }
  render() {
    const categories = this.props.categories;
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path='/' render={() => (<h1>Home</h1>)}/>
          <Link to='/'>To Home</Link>
          <li>
            {categories.map(category => {
              return (<ul key={`ul-link-${category.path}`}><Link to={'/' + category.path}>To {category.path}</Link></ul>)
            })}
          </li>
          {categories.map(category => {
            return (<Category key={`category-${category.path}`} name={category.name} path={category.path}></Category>)
          })}        
        </div>
      </BrowserRouter>
    );
  }
}
//<Link to='/testCategory'>To test category</Link>


App.propTypes = {
  categories: PropTypes.array.isRequired,
  setCategories: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    categories: state.categories.data,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCategories: (data) => dispatch(setCategories(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
