import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { voteOnPost } from '../actions/post.actions'
import { Link } from 'react-router-dom'
import * as util from '../utils/util'

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
        <div>by <i>{post.author}</i></div>
        <div>Number of comments: {post.commentCount}</div>
        <div>Score: {post.voteScore}</div>
        <button onClick={() => util.vote(post, true, this.props.voteOnPost)}>/\</button>
        <button onClick={() => util.vote(post, false, this.props.voteOnPost)}>\/</button>
        <Link to={`/${post.category}/${post.id}`}><button>View Post</button></Link>
        <button>Delete Post</button>
      </div>
    );
  }
}

PostOverview.propTypes = {
  id: PropTypes.string.isRequired,
  voteOnPost: PropTypes.func.isRequired,
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
    voteOnPost: (post, isUpvote) => dispatch(voteOnPost(post, isUpvote))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostOverview);