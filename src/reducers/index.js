import { combineReducers } from 'redux'


import {
  SET_CATEGORIES,
} from '../actions/category.actions'

import {
  SET_POSTS,
  VOTE_ON_POST,
  ADD_NEW_POST,
  EDIT_POST,
  DELETE_POST,
} from '../actions/post.actions'

import {
  SET_COMMENTS_FOR_POST_ID,
  VOTE_ON_COMMENT,
  POST_COMMENT,
  EDIT_COMMENT,
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
      let { post, isUpvote} = action;
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
    case ADD_NEW_POST:
      return {
        data: [
          ...state.data,
          action.post
        ]
      }

    case POST_COMMENT:
      const { targetPost } = action;
      const addCommentIndex = state.data.indexOf(targetPost);
      const addedCommentCount = state.data[addCommentIndex].commentCount + 1;
      return {
        data: [
          ...state.data.slice(0, addCommentIndex),
          {
            ...state.data[addCommentIndex], commentCount: addedCommentCount
          },
          ...state.data.slice(addCommentIndex + 1)
        ]
      }
    case EDIT_POST:
      const { oldPost, editedPost } = action;
      const editedPostIndex = state.data.indexOf(oldPost);
      return {
        data: [
          ...state.data.slice(0, editedPostIndex),
          {...editedPost},
          ...state.data.slice(editedPostIndex + 1)
        ]
      }
    case DELETE_POST:
      const { deletedPost } = action;
      const deletedPostIndex = state.data.indexOf(deletedPost);
      return {
        data: [
          ...state.data.slice(0, deletedPostIndex),
          ...state.data.slice(deletedPostIndex + 1)
        ]
      }
    default:
      return state;
  }
}

const initialCommentsState = {
  data: {}
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

    case POST_COMMENT:
      const { newComment } = action;
      return {
        data: {
          ...state.data,
          [newComment.parentId]: [
            ...state.data[newComment.parentId],
            {...newComment}
          ]
        }
      }

    case EDIT_COMMENT:
      const { oldComment, editedComment } = action;
      const indexOfEditedComment = state.data[oldComment.parentId].indexOf(oldComment)
      return {
        data: {
          ...state.data,
          [oldComment.parentId]: [
            ...state.data[oldComment.parentId].slice(0, indexOfEditedComment),
            {...editedComment},
            ...state.data[oldComment.parentId].slice(indexOfEditedComment+1)
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