import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { voteOnPost } from '../actions/post.actions'
import * as util from '../utils/util'

class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const post = this.props.post;
    return (
      <div>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <div>Posted by <i>{post.author}</i></div>
        <div>Comments: {post.commentCount}</div>
        <div>Score: {post.voteScore}</div>
        <button onClick={() => util.vote(post, true, this.props.voteOnPost)}>/\</button>
        <button onClick={() => util.vote(post, false, this.props.voteOnPost)}>\/</button>
        <button>Delete Post</button>
      </div>
    );
  }
}

PostDetail.propTypes = {
  id: PropTypes.string.isRequired,
  voteOnPost: PropTypes.func.isRequired,
}

function mapStateToProps(state, props) {
  let tempPosts = state.posts.data.filter(datum => {
    return datum.id === props.match.params.id
  });
  return {
    id: props.match.params.id,
    post: tempPosts.length === 1 ? tempPosts[0] : {},
  }
}

function mapDispatchToProps(dispatch) {
  return {
    voteOnPost: (post, isUpvote) => dispatch(voteOnPost(post, isUpvote))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);