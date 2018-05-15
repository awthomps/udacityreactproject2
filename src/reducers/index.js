import { combineReducers } from 'redux'


import {
  SET_CATEGORIES,
} from '../actions/category.actions'

import {
  SET_POSTS,
  VOTE_ON_POST,
} from '../actions/post.actions'

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

export default combineReducers({
  categories,
  posts,
});