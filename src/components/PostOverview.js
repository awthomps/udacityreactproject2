import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class PostOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const post = this.props.post;
    return (
      <div id={post.id}>
        <h3>{post.title}</h3>
        <div>{post.author}</div>
        <div>Number of comments: {post.commentCount}</div>
        <div>Score: {post.voteScore}</div>
        <button>/\</button>
        <button>\/</button>
        <button>View Post</button>
        <button>Delete Post</button>
      </div>
    );
  }
}

PostOverview.propTypes = {
  id: PropTypes.string.isRequired,
}

function mapStateToProps(state, props) {
  let tempPosts = state.posts.data.filter(datum => {
    return datum.id === props.id
  });
  return {
    post: tempPosts.length === 1 ? tempPosts[0] : {},
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostOverview);