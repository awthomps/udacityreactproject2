const api = 'http://localhost:3001/';

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
    .then(res = res.json())
    .then(data => data.categories)
// | `GET /:category/posts` | Get all of the posts for a particular category. |  |
export const getAllPostsForCategory = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(res = res.json())
// | `GET /posts` | Get all of the posts. Useful for the main page when no category is selected. |  |
export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res = res.json())
// | `POST /posts` | Add a new post. | **id** - UUID should be fine, but any unique id will work <br> **timestamp** - [Timestamp] Can in whatever format you like, you can use `Date.now()` if you like. <br> **title** - [String] <br> **body** - [String] <br> **author** - [String] <br> **category** -  Any of the categories listed in `categories.js`. Feel free to extend this list as you desire. |
export const addNewPost = () =>
  fetch(`${api}/posts`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ post })
  }).then(res => res.json())
// | `GET /posts/:id` | Get the details of a single post. | |
// | `POST /posts/:id` | Used for voting on a post. | **option** - [String]: Either `"upVote"` or `"downVote"`. |
// | `PUT /posts/:id` | Edit the details of an existing post. | **title** - [String] <br> **body** - [String] |
// | `DELETE /posts/:id` | Sets the deleted flag for a post to 'true'. <br> Sets the parentDeleted flag for all child comments to 'true'. | |
// | `GET /posts/:id/comments` | Get all the comments for a single post. | |
// | `POST /comments` | Add a comment to a post. | **id** - Any unique ID. As with posts, UUID is probably the best here. <br> **timestamp** - [Timestamp] Get this however you want. <br> **body** - [String] <br> **author** - [String] <br> **parentId** - Should match a post id in the database. |
// | `GET /comments/:id` | Get the details for a single comment. | |
// | `POST /comments/:id` | Used for voting on a comment. | **option** - [String]: Either `"upVote"` or `"downVote"`.  |
// | `PUT /comments/:id` | Edit the details of an existing comment. | **timestamp** - timestamp. Get this however you want. <br> **body** - [String] |
// | `DELETE /comments/:id` | Sets a comment's deleted flag to `true`. | &nbsp; |