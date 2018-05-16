import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  voteOnComment,
} from '../actions/comment.actions'
import * as util from '../utils/util'


class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const { comment } = this.props;

    return (
      <div>
        <hr/>
        <div><i>{comment.author} says...</i></div>
        <p>{comment.body}</p>
        <div>Score: {comment.voteScore}</div>
        <button onClick={() => util.commentVote(comment, true, this.props.voteOnComment)}>/\</button>
        <button onClick={() => util.commentVote(comment, false, this.props.voteOnComment)}>\/</button>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    )
  }
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
}

function mapStateToProps(state, props) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    voteOnComment: (comment, isUpvote) => dispatch(voteOnComment(comment, isUpvote)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);