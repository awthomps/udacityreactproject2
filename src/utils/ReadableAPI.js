const api = 'http://localhost:3001';

// Generate a unique token for sending data to the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

// The following endpoints are available:

//Endpoint comments formatted as so:
// | Endpoints       | Usage          | Params         |

// | `GET /categories` | Get all of the categories available for the app. List is found in `categories.js`. Feel free to extend this list as you desire. |  |
export const getAllCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)
// | `GET /:category/posts` | Get all of the posts for a particular category. |  |
export const getAllPostsForCategory = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())
// | `GET /posts` | Get all of the posts. Useful for the main page when no category is selected. |  |
export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
// | `POST /posts` | Add a new post. | **id** - UUID should be fine, but any unique id will work <br> **timestamp** - [Timestamp] Can in whatever format you like, you can use `Date.now()` if you like. <br> **title** - [String] <br> **body** - [String] <br> **author** - [String] <br> **category** -  Any of the categories listed in `categories.js`. Feel free to extend this list as you desire. |
export const addNewPost = (id, title, body, author, category) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: id,
      timestamp: Date.now(),
      title: title,
      body: body,
      author: author,
      category: category
    })
  }).then(res => res.json())
// | `GET /posts/:id` | Get the details of a single post. | |
export const getPost = (id) =>
  fetch(`${api}/posts/${id}`, headers)
  .then(res => res.json())
// | `POST /posts/:id` | Used for voting on a post. | **option** - [String]: Either `"upVote"` or `"downVote"`. |
export const voteOnPost = (id, upvote) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      option: upvote ? 'upVote' : 'downVote'
    })
  }).then(res => res.json())
// | `PUT /posts/:id` | Edit the details of an existing post. | **title** - [String] <br> **body** - [String] |
export const editPost = (id, title, body) =>
  fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: title,
      body: body
    })
  }).then(res => res.json())
// | `DELETE /posts/:id` | Sets the deleted flag for a post to 'true'. <br> Sets the parentDeleted flag for all child comments to 'true'. | |
export const deletePost = (id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
// | `GET /posts/:id/comments` | Get all the comments for a single post. | |
export const getCommentsForPost = (id) =>
  fetch(`${api}/posts/${id}/comments`, { headers })
  .then(res => res.json())
// | `POST /comments` | Add a comment to a post. | **id** - Any unique ID. As with posts, UUID is probably the best here. <br> **timestamp** - [Timestamp] Get this however you want. <br> **body** - [String] <br> **author** - [String] <br> **parentId** - Should match a post id in the database. |
export const postComment = (id, body, author, parentId) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: id,
      timestamp: Date.now(),
      body: body,
      author: author,
      parentId: parentId
    })
  }).then(res => res.json())
// | `GET /comments/:id` | Get the details for a single comment. | |
export const getComment = (id) =>
  fetch(`${api}/comments/${id}`, headers)
  .then(res => res.json())
// | `POST /comments/:id` | Used for voting on a comment. | **option** - [String]: Either `"upVote"` or `"downVote"`.  |
export const voteOnComment = (id, upvote) =>
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      option: upvote ? 'upVote' : 'downVote'
    })
  }).then(res => res.json())
// | `PUT /comments/:id` | Edit the details of an existing comment. | **timestamp** - timestamp. Get this however you want. <br> **body** - [String] |
export const editComment = (id, body) =>
  fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      timestamp: Date.now(),
      body: body
    })
  }).then(res => res.json())
// | `DELETE /comments/:id` | Sets a comment's deleted flag to `true`. | &nbsp; |
export const deleteComment = (id) =>
  fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())