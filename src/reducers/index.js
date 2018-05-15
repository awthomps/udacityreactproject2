import { combineReducers } from 'redux'


import {
  SET_CATEGORIES,
} from '../actions/category.actions'

import {
  SET_POSTS,
  VOTE_ON_POST,
} from '../actions/post.actions'

import {
  SET_COMMENTS_FOR_POST_ID,
  VOTE_ON_COMMENT,
} from '../actions/comment.actions'

const initialCategoriesState = {
  data: [],
}

function categories (state = initialCategoriesState, action) {
  switch(action.type) {
    case SET_CATEGORIES:
      const { categories } = action;
      return {
        data: categories,
      }
    default:
      return state;
  }
}

const initialPostsState = {
  data: [],
}

function posts (state = initialPostsState, action) {
  switch(action.type) {
    case SET_POSTS:
      const { posts } = action;
      return {
        data: posts,
      }
    case VOTE_ON_POST:
      const { post, isUpvote} = action;
      let index = state.data.indexOf(post);
      let newScore = post.voteScore + (isUpvote ? 1 : -1);
      return {
        data: [
          ...state.data.slice(0, index),
          {
            ...state.data[index], voteScore: newScore
          },
          ...state.data.slice(index + 1)
        ]
          
      }
    default:
      return state;
  }
}

const initialCommentsState = {
  data: {},
}

function comments(state = initialCommentsState, action) {
  switch(action.type) {
    case SET_COMMENTS_FOR_POST_ID:
      const { id, comments } = action;
      return {
        data: {...state.data, [id]: comments}
      }
    case VOTE_ON_COMMENT:
      const {comment, isUpvote} = action;
      const newScore = comment.voteScore + (isUpvote ? 1 : -1);
      const index = state.data[comment.parentId].indexOf(comment);
      return {
        data: {...state.data,
          [comment.parentId]: [
            ...state.data[comment.parentId].slice(0, index),
            {...comment, voteScore: newScore},
            ...state.data[comment.parentId].slice(index + 1)
          ]
        }
      }

    default:
      return state;
  }
}

export default combineReducers({
  categories,
  posts,
  comments,
});