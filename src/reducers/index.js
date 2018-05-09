import { combineReducers } from 'redux'


import {
  SET_CATEGORIES,
} from '../actions/category.actions'

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


const initialCategoriesState = {
  data: [],
}

export default combineReducers({
  categories,
});