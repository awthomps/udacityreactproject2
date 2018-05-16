import * as ReadableAPI from '../utils/ReadableAPI'

const uuidv4 = require('uuid/v4');

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

// Items to make sure a uuid isn't already used
export function uuid(items) {
  let uuid = uuidv4();
  while(idExistsInArray(items, uuid)) {
    uuid = uuidv4();
  }
  return uuid;
}

function idExistsInArray(items, id) {
  for(let i = 0; i < items.length; ++i) {
    if(items[i].id === id) {
      return true;
    }
  }
  return false;
}