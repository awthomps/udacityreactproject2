import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { voteOnPost } from '../actions/post.actions'
import { Link } from 'react-router-dom'
import * as util from '../utils/util'
import { Route } from 'react-router-dom'

class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const { post } = this.props;
    return (
      <div key={`post-detail-${post.category}-${post.id}`}>
        <Route exact path={`/${post.category}/${post.id}`} render={() => (
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
        )}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);