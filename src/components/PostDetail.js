import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  voteOnPost,
  editPost,
 } from '../actions/post.actions'
import {
  setCommentsForPostId,
  postComment,
} from '../actions/comment.actions'
import * as util from '../utils/util'
import * as ReadableAPI from '../utils/ReadableAPI'
import Comment from './Comment'

class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditPostForm: false,
      editTitle: '',
      editBody: '',
      comments: [],
      showNewCommentForm: false,
      newCommentAuthor: '',
      newCommentBody: '',
    }
  }

  componentWillMount() {
    ReadableAPI.getCommentsForPost(this.props.id)
    .then(comments => this.props.setCommentsForPostId(this.props.id, comments));
    this.setState({
      
    });
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
        {!this.state.showEditPostForm
        ? <button onClick={() => {
          this.setState({
            showEditPostForm: true,
            editTitle: this.props.post.title,
            editBody: this.props.post.body,
          })}
        }>Edit Post</button>
        : <div className='inputform'>
            <form onSubmit={this.handleEditPost}>
              <fieldset>
                <label>Title:</label><input type='text' onChange={this.handleEditTitleChange} defaultValue={post.title}/>
                <label>Body:</label><br></br><textarea type='text' onChange={this.handleEditBodyChange} defaultValue={post.body}/>
                <input type='submit' value='Submit'/><button onClick={() => {this.setState({ showEditPostForm: false })}}>Cancel</button>
              </fieldset>
            </form>
          </div>
        }
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
              <Comment
                key={'comment-'+comment.id+'-parent-'+comment.parentId}
                id={comment.id}
                parentId={comment.parentId}
              />
            );
          })}
        </div>
        :
        <div> No Comments </div>}

      </div>
    );
  }

  handleEditTitleChange = (event) => {
    this.setState({editTitle: event.target.value});
  }
  handleEditBodyChange = (event) => {
    this.setState({editBody: event.target.value});
  }

  handleEditPost = (event) => {
    event.preventDefault();
    // Do some validation:
    let {editTitle, editBody } = this.state;
    const {id} = this.props.post;
    if(!editTitle) {
      alert('Title is empty or invalid. Please specify a value.');
    } else if(!editBody) {
      alert('Body is empty or invalid, Please specify a value.');
    } else if(!id) {
      alert('Problem getting id for post edit.');
    } else if(
      editTitle === this.props.post.title &&
      editBody === this.props.post.body &&
      !window.confirm("Body and Title are unchanged. Are you sure you want to edit?")
    ) {
      // Do Nothing
    } else {
      // Should be ok:
      ReadableAPI.editPost(id, editTitle, editBody)
      .then((editedPost) => {
        this.props.editPost(this.props.post, editedPost);
        alert('Succesfully editted!')
        this.setState({showEditPostForm: false})
      });
    }
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
    editPost: (oldPost, editedPost) => dispatch(editPost(oldPost, editedPost)),
    voteOnPost: (post, isUpvote) => dispatch(voteOnPost(post, isUpvote)),
    setCommentsForPostId: (id, comments) => dispatch(setCommentsForPostId(id, comments)),
    postComment: (post, comment) => dispatch(postComment(post, comment)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);