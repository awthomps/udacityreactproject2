import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  voteOnComment,
  editComment,
  deleteComment,
} from '../actions/comment.actions'
import * as util from '../utils/util'
import * as ReadableAPI from '../utils/ReadableAPI'


class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditCommentForm: false,
      editBody: '',
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
        {!this.state.showEditCommentForm
        ? <button onClick={() => {
            this.setState({
              showEditCommentForm: true,
              editBody: comment.body
            })}
          }>Edit Comment</button>
        : <div className='inputform'>
            <form onSubmit={this.handleEditComment}>
              <fieldset>
                <label>Body:</label><br></br><textarea type='text' onChange={this.handleEditBodyChange} defaultValue={comment.body}/>
                <input type='submit' value='Submit'/><button onClick={() => {this.setState({ showEditCommentForm: false })}}>Cancel</button>
              </fieldset>
            </form>
            </div>
        }
        <button onClick={this.handleDeleteComment}>Delete</button>
      </div>
    )
  }

  handleEditBodyChange = (event) => {
    this.setState({editBody: event.target.value});
  }

  handleEditComment = (event) => {
    event.preventDefault();
    // Do some validation:
    let { editBody } = this.state;
    const {id} = this.props.comment;
    if(!editBody) {
      alert('Body is empty or invalid, Please specify a value.');
    } else if(!id) {
      alert('Problem getting id for comment edit.');
    } else if(
      editBody === this.props.comment.body &&
      !window.confirm("Body is unchanged. Are you sure you want to edit?")
    ) {
      // Do Nothing
    } else {
      // Should be ok:
      ReadableAPI.editComment(id, editBody)
      .then((editedComment) => {
        this.props.editComment(this.props.comment, editedComment);
        alert('Succesfully editted!')
        this.setState({showEditCommentForm: false})
      });
    }
  }

  handleDeleteComment = (event) => {
    if(window.confirm("Are you sure you would like to delete this comment?")) {
      ReadableAPI.deleteComment(this.props.id)
      .then((data) => {
        this.props.deleteComment(this.props.post, this.props.comment);
        alert('Comment successfully deleted!');
      });
    }
  }
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  parentId: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
}

function mapStateToProps(state, props) {
  let tempComments = state.comments.data[props.parentId].filter(comment => {
    return comment.id === props.id;
  });
  return {
    comment: tempComments.length === 1 ? tempComments[0] : {},
  }
}

function mapDispatchToProps(dispatch) {
  return {
    voteOnComment: (comment, isUpvote) => dispatch(voteOnComment(comment, isUpvote)),
    editComment: (oldComment, editedComment) => dispatch(editComment(oldComment, editedComment)),
    deleteComment: (sourcePost, deletedComment) => dispatch(deleteComment(sourcePost, deletedComment)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);