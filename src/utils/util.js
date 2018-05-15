import * as ReadableAPI from '../utils/ReadableAPI'
export function vote (post, isUpvote, voteOnPost) {
  ReadableAPI.voteOnPost(post.id, isUpvote)
  .then(updatedPost => {
    if(updatedPost) {
      voteOnPost(post, isUpvote);
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