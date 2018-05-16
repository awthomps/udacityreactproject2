import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { voteOnPost, deletePost } from '../actions/post.actions'
import { Link } from 'react-router-dom'
import * as util from '../utils/util'
import * as ReadableAPI from '../utils/ReadableAPI'

class PostOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeletedPostView: false,

    }
  }

  render() {
    const post = this.props.post;
    return (
      <div id={post.id}>
        <hr/>
        <h3>{post.title}</h3>
        <div>by <i>{post.author}</i></div>
        <div>Comments: {post.commentCount}</div>
        <div>Score: {post.voteScore}</div>
        <button onClick={() => util.postVote(post, true, this.props.voteOnPost)}>/\</button>
        <button onClick={() => util.postVote(post, false, this.props.voteOnPost)}>\/</button>
        <Link to={`/${post.category}/${post.id}`}><button>View Post</button></Link>
        <button onClick={this.handleDeletePost}>Delete Post</button>
      </div>
    );
  }

  handleDeletePost = (event) => {
    if(window.confirm(
      "Are you sure you would like to delete post titled: "
      + this.props.post.title + '?'
    )) {
      ReadableAPI.deletePost(this.props.post.id)
      .then((data) => {
        this.props.deletePost(this.props.post);
        alert('Post successfully deleted!')
      });
    }
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
    voteOnPost: (post, isUpvote) => dispatch(voteOnPost(post, isUpvote)),
    deletePost: (post) => dispatch(deletePost(post)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostOverview);