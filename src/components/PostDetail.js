import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { voteOnPost } from '../actions/post.actions'
import { setCommentsForPostId, voteOnComment} from '../actions/comment.actions'
import * as util from '../utils/util'
import * as ReadableAPI from '../utils/ReadableAPI'

class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
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
        <button>Add Comment</button>

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
    setCommentsForPostId: (id, comments) => dispatch(setCommentsForPostId(id, comments))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);