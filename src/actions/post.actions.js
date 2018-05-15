export const SET_POSTS = 'SET_POSTS'
export const VOTE_ON_POST = 'VOTE_ON_POST'


export function setPosts(posts) {
  return {
    type: SET_POSTS,
    posts,
  }
}

export function voteOnPost(post, isUpvote) {
  return {
    type: VOTE_ON_POST,
    post,
    isUpvote,
  }
}