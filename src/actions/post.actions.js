export const SET_POSTS = 'SET_POSTS'
export const VOTE_ON_POST = 'VOTE_ON_POST'
export const ADD_NEW_POST = 'ADD_NEW_POST'
export const EDIT_POST = 'EDIT_POST'


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

export function addNewPost(post) {
  return {
    type: ADD_NEW_POST,
    post,
  }
}

export function editPost(oldPost, editedPost) {
  return {
    type: EDIT_POST,
    oldPost,
    editedPost,
  }
}