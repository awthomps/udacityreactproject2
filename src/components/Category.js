import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Posts from './Posts'
import { connect } from 'react-redux';

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const {name, path} = this.props.category;
    return (
      <div>
        <h2>{path}</h2>
        {name && path && <Posts name={name} path={path}/>}
      </div>
    );
  }
}

Category.propTypes = {
  category: PropTypes.object,
}

function mapStateToProps(state, props) {
  let tempCategories = state.categories.data.filter(datum => {
    return datum.path === props.match.params.category
  });
  return {
    category: tempCategories.length === 1 ? tempCategories[0] : {},
  }
}

export default connect(mapStateToProps)(Category);