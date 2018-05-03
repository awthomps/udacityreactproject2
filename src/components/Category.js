import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
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
      <Route path={path} render={() => (<div>
        <Link to='/'>To Home</Link>

      </div>)}/>
    );
  }
}

Category.PropTypes = {
  path: PropTypes.string.isRequired
}

export default Category;