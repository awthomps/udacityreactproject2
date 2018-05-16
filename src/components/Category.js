import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Posts from './Posts'
import { connect } from 'react-redux';
import * as ReadableAPI from '../utils/ReadableAPI';
import * as util from '../utils/util';
import { addNewPost } from '../actions/post.actions'

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNewPostForm: false,
      newPostCategory: '',
      newTitle: '',
      newAuthor: '',
      newBody: '',
    }
  }

  render() {
    const {name, path} = this.props.category;
    return (
      <div>
        <h2>{name}</h2>
        {!this.state.showNewPostForm ?
          <button onClick={() => {this.setState({ showNewPostForm: true })}}>Add New Post</button>
        :
          <div className='inputform'>
            <form onSubmit={this.handleNewPost}>
              <fieldset>
                {!path && this.getSelectItem()}
                <label>Title:</label><input type='text' onChange={this.handleTitleChange}/>
                <label>Author:</label><input type='text' onChange={this.handleAuthorChange}/>
                <label>Body:</label><br></br><textarea type='text' onChange={this.handleBodyChange}/>
                <input type='submit' value='Submit'/><button onClick={() => {this.setState({ showNewPostForm: false })}}>Cancel</button>
              </fieldset>
            </form>
          </div>
        }
        <br/>
        <Posts name={name} path={path}/>
      </div>
    );
  }

  getSelectItem() {
    const defaultCategory = this.getDefaultCategory();
    return (
      <div>
        <label>Category:</label><br/>
        <select onChange={this.handleCategoryChange} defaultValue={defaultCategory}>
          {this.props.categories.map(category => {return (
            <option key={'new-post-category-option-'+category.path} value={category.path}>{category.name}</option>
          )})}
        </select>
        <br/>
      </div>
    )
  }

  getDefaultCategory() {
    return this.props.category.path ? this.props.category.path : this.props.categories[0].path;
  }

  handleCategoryChange = (event) => {
    console.log(event.target.value);
    this.setState({newPostCategory: event.target.value})
  }

  handleTitleChange = (event) => {
    this.setState({newTitle: event.target.value});
  }
  handleAuthorChange = (event) => {
    this.setState({newAuthor: event.target.value});
  }
  handleBodyChange = (event) => {
    this.setState({newBody: event.target.value});
  }

  handleNewPost = (event) => {
    event.preventDefault();
    
    // Do some validation:
    let newPostCategory = this.state.newPostCategory ? this.state.newPostCategory : this.getDefaultCategory();
    const { newTitle, newAuthor, newBody} = this.state;
    const uuid = util.uuid(this.props.posts)
    if(!newPostCategory) {
      alert('Target category is empty or invalid. Something is wrong...');
    } else if(!newTitle) {
      alert('Title is empty or invalid. Please specify a value.');
    } else if(!newAuthor) {
      alert('Author is empty or invalid. Please specify a value.');
    } else if(!newBody) {
      alert('Body is empty or invalid, Please specify a value.');
    } else if(!uuid) {
      alert('Problem generating a uuid to make a new post. Try a different browser.');
    } else {
      // Should be ok:
      ReadableAPI.addNewPost(uuid, newTitle, newBody, newAuthor, newPostCategory)
      .then((newPost) => {
        this.props.addNewPost(newPost);
        alert('Succesfully posted!')
        this.setState({ showNewPostForm: false });
      });
    }
  }
}

Category.propTypes = {
  category: PropTypes.object,
  posts: PropTypes.array,
}

function mapStateToProps(state, props) {
  let tempCategories = state.categories.data.filter(datum => {
    return datum.path === props.match.params.category
  });
  return {
    category: tempCategories.length === 1 ? tempCategories[0] : {name: 'All', path: ''},
    posts: state.posts.data,
    categories: state.categories.data,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addNewPost: (post) => dispatch(addNewPost(post))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);