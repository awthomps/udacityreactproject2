import { combineReducers } from 'redux'


import {
  SET_CATEGORIES,
} from '../actions/category.actions'

import {
  SET_POSTS,
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
    default:
      return state;
  }
}

export default combineReducers({
  categories,
  posts,
});