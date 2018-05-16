import React, { Component } from 'react';
import Category from './components/Category'
import './App.css';
import * as ReadableAPI from './utils/ReadableAPI'
import { Switch, Link, Route } from 'react-router-dom'
import { setCategories } from './actions/category.actions'
import { setPosts } from './actions/post.actions'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';
import PostDetail from './components/PostDetail'

class App extends Component {

  state = {
  }

  componentDidMount() {

    // Initialize store:
    ReadableAPI.getAllCategories()
    .then(categories => this.props.setCategories(categories));
    ReadableAPI.getAllPosts()
    .then(posts => this.props.setPosts(posts));
  }
  render() {
    const {categories} = this.props;
    return (
      <BrowserRouter>
        <div className="App">
          {/* Home Page: */}
          <Link to='/'><h1>Readable</h1></Link>
          <li>
            {categories.map(category => {
              return (<ul key={`ul-link-${category.path}`}><Link to={'/' + category.path}>To {category.path}</Link></ul>)
            })}
          </li>
          <Switch>
            {/* Home Page */}
            <Route exact path='/' component={Category}/>
            {/* Post Pages: */}
            <Route exact path={'/:category/:id'} component={PostDetail}/>
            {/* Category Pages: */}
            <Route exact path={'/:category'}component={Category}/>
          </Switch>

        </div>
      </BrowserRouter>
    );
  }
}
//<Link to='/testCategory'>To test category</Link>


App.propTypes = {
  categories: PropTypes.array.isRequired,
  setCategories: PropTypes.func.isRequired,
  setPosts: PropTypes.func.isRequired,}

function mapStateToProps(state) {
  return {
    categories: state.categories.data,
    posts: state.posts.data,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCategories: (data) => dispatch(setCategories(data)),
    setPosts: (data) => dispatch(setPosts(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
