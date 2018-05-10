import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types';
import Posts from './Posts'

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const {path, name} = this.props;
    const urlPath = '/' + path;
    return (
      <div>
        <Route path={urlPath} render={() => (<div>
          <h2>{this.props.name}</h2>
          <Posts name={name} path={path}/>
        </div>)}/> 
      </div>
    );
  }
}

Category.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired
}

export default Category;