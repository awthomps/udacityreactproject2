import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostOverview from './PostOverview'

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const {name, posts} = this.props;
    return (
      <div>
          {posts.map(post => {
            return <PostOverview key={`post-${post.id}`} id={post.id}/>
          })}
      </div>
    );
  }
}

Posts.propTypes = {
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

function mapStateToProps(state, props) {
  return {
    posts: !props.path ?
      state.posts.data :
      state.posts.data.filter(datum => {
        return datum.category === props.name
      }),
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);