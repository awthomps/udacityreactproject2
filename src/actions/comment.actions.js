export const SET_COMMENTS_FOR_POST_ID = 'SET_COMMENTS_FOR_POST_ID'
export const VOTE_ON_COMMENT = 'VOTE_ON_COMMENT'

export function setCommentsForPostId(id, comments) {
  return {
    type: SET_COMMENTS_FOR_POST_ID,
    id,
    comments,
  }
}

export function voteOnComment(comment, isUpvote) {
  return {
    type: VOTE_ON_COMMENT,
    comment,
    isUpvote,
  }
}