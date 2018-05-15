import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ReadableAPI from '../utils/ReadableAPI'
import { voteOnPost } from '../actions/post.actions'

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
        <button onClick={() => this.vote(true)}>/\</button>
        <button onClick={() => this.vote(false)}>\/</button>
        <button>View Post</button>
        <button>Delete Post</button>
      </div>
    );
  }
  //Either `"upVote"` or `"downVote"`.
  vote = (isUpvote) => {
    ReadableAPI.voteOnPost(this.props.post.id, isUpvote)
    .then(updatedPost => {
      if(updatedPost) {
        this.props.voteOnPost(this.props.post, isUpvote);
      } else {
        window.alert(`Failed to ${(isUpvote ? 'upvote' : 'downvote')}`)
      }
    })
    .catch(response => {
        console.log(response);
        window.alert(`Failed to ${(isUpvote ? 'upvote' : 'downvote')}`)
      }
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