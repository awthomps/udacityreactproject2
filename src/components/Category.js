import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types';
class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const path = '/' + this.props.path;
    return (
      <div>
        <Route path={path} render={() => (<div>
          <h2>{this.props.name}</h2>
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