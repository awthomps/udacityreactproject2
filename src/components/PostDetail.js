import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { voteOnPost } from '../actions/post.actions'
import {
  setCommentsForPostId,
  voteOnComment,
  postComment,
} from '../actions/comment.actions'
import * as util from '../utils/util'
import * as ReadableAPI from '../utils/ReadableAPI'

class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      showNewCommentForm: false,
      newCommentAuthor: '',
      newCommentBody: '',
    }
  }

  component
  componentWillMount() {
    ReadableAPI.getCommentsForPost(this.props.id)
    .then(comments => this.props.setCommentsForPostId(this.props.id, comments));
  }

  render() {
    const {post, comments} = this.props;
    return (
      <div>
        <hr/>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <div>Posted by <i>{post.author}</i></div>
        <div>Comments: {post.commentCount}</div>
        <div>Score: {post.voteScore}</div>
        <button onClick={() => util.postVote(post, true, this.props.voteOnPost)}>/\</button>
        <button onClick={() => util.postVote(post, false, this.props.voteOnPost)}>\/</button>
        <button>Delete Post</button>
        {!this.state.showNewCommentForm
        ? <button onClick={() => {this.setState({ showNewCommentForm: true })}}>Add Comment</button>
        : <div className='inputform'>
            <form onSubmit={this.handleNewComment}>
              <fieldset>
                <label>Comment Author:</label><input type='text' onChange={this.handleCommentAuthorChange}/>
                <label>Comment Body:</label><br></br><textarea type='text' onChange={this.handleCommentBodyChange}/>
                <input type='submit' value='Submit'/><button onClick={() => {this.setState({ showNewCommentForm: false })}}>Cancel</button>
              </fieldset>
            </form>
          </div>
        }

        {/* Comments */}
        {comments ? 
        <div>
          {comments.map(comment => {
            return (
              <div key={'comment-'+comment.id+'-parent-'+comment.parentId}>
                <hr/>
                <div><i>{comment.author} says...</i></div>
                <p>{comment.body}</p>
                <div>Score: {comment.voteScore}</div>
                <button onClick={() => util.commentVote(comment, true, this.props.voteOnComment)}>/\</button>
                <button onClick={() => util.commentVote(comment, false, this.props.voteOnComment)}>\/</button>
                <button>Edit</button>
                <button>Delete</button>
              </div>
            );
          })}
        </div>
        :
        <div> No Comments </div>}

      </div>
    );
  }

  handleCommentAuthorChange = (event) => {
    this.setState({newCommentAuthor: event.target.value});
  }

  handleCommentBodyChange = (event) => {
    this.setState({newCommentBody: event.target.value});
  }

  handleNewComment = (event) => {
    event.preventDefault();
    // Do some validation:
    const { newCommentAuthor, newCommentBody } = this.state;
    const uuid = util.uuid(this.props.comments)
    if(!newCommentAuthor) {
      alert('Comment Author is empty or invalid. Please specify a value.');
    } else if(!newCommentBody) {
      alert('Comment Body is empty or invalid, Please specify a value.');
    } else if(!uuid) {
      alert('Problem generating a uuid to make a new comment. Try a different browser.');
    } else {
      // Should be ok:
      ReadableAPI.postComment(uuid, newCommentBody, newCommentAuthor, this.props.post.id)
      .then((newComment) => {
        this.props.postComment(this.props.post, newComment);
        alert('Succesfully commented!')
      });
    }
  } 
}

PostDetail.propTypes = {
  id: PropTypes.string.isRequired,
  voteOnPost: PropTypes.func.isRequired,
}

function mapStateToProps(state, props) {
  const id = props.match.params.id;
  let tempPosts = state.posts.data.filter(datum => {
    return datum.id === id
  });
  return {
    id: props.match.params.id,
    post: tempPosts.length === 1 ? tempPosts[0] : {},
    comments: id ? state.comments.data[id] : []
  }
}

function mapDispatchToProps(dispatch) {
  return {
    voteOnPost: (post, isUpvote) => dispatch(voteOnPost(post, isUpvote)),
    voteOnComment: (comment, isUpvote) => dispatch(voteOnComment(comment, isUpvote)),
    setCommentsForPostId: (id, comments) => dispatch(setCommentsForPostId(id, comments)),
    postComment: (post, comment) => dispatch(postComment(post, comment)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);