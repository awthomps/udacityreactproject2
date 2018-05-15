import * as ReadableAPI from '../utils/ReadableAPI'
export function postVote (post, isUpvote, voteOnPost) {
  ReadableAPI.voteOnPost(post.id, isUpvote)
  .then(updatedPost => {
    if(updatedPost) {
      voteOnPost(post, isUpvote);
    } else {
      window.alert(`Failed to ${(isUpvote ? 'upvote' : 'downvote')} post.`)
    }
  })
  .catch(response => {
      console.log(response);
      window.alert(`Failed to ${(isUpvote ? 'upvote' : 'downvote')} post.`)
    }
  );
}

export function commentVote (comment, isUpvote, voteOnComment) {
  ReadableAPI.voteOnComment(comment.id, isUpvote)
  .then(updatedComment => {
    if(updatedComment) {
      voteOnComment(comment, isUpvote);
    } else {
      window.alert(`Failed to ${(isUpvote ? 'upvote' : 'downvote')} comment.`)
    }
  })
  .catch(response => {
    console.log(response);
    window.alert(`Failed to ${(isUpvote ? 'upvote' : 'downvote')} comment.`)
  })
}