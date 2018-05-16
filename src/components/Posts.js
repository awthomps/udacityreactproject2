import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostOverview from './PostOverview'

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortByTimestamp: true,
      sortAscending: true,
    }
  }

  render() {
    const { posts } = this.props;
    let sortedPosts = posts;
    // console.log(this.state.sortByTimestamp);
    if(this.state.sortByTimestamp) {
      sortedPosts.sort(this.directionalTimestampSort);
      // console.log('time');
    } else {
      sortedPosts.sort(this.directionalScoreSort);
      // console.log('vote');
    }
    return (

      <div>
        <select onChange={this.setSortMethod}>
          <option value='true' defaultValue>Sort By Date</option>
          <option value='false'>Sort by Score</option>
        </select>
        <select onChange={this.setSortDirection}>
          <option value='true' defaultValue>Ascending</option>
          <option value='false'>Descending</option>
        </select>
        {sortedPosts.map(post => {
          return <PostOverview key={`post-${post.id}`} id={post.id}/>
        })}
      </div>
    );
  }
  

  setSortMethod = (event) => {this.setState({sortByTimestamp: event.target.value === 'true'})}
  setSortDirection = (event) => {this.setState({sortAscending: event.target.value === 'true'})}

  // sortMethod(postA, postB) {
  //   if(this.state.sortByTimestamp) {
  //     return this.timestampSort(postA, postB)
  //   } else {
  //     return this.voteScoreSort(postA, postB);
  //   }
  // }
  
  directionalScoreSort = (postA, postB) => {
    return (this.state.sortAscending)
    ? this.voteScoreSort(postA, postB)
    : this.voteScoreSort(postB, postA);
  }

  voteScoreSort(postA, postB) {
    return postA.voteScore - postB.voteScore;
  }
  
  directionalTimestampSort = (postA, postB) => {
    return (this.state.sortAscending)
    ? this.timestampSort(postA, postB)
    : this.timestampSort(postB, postA);
  }

  timestampSort(postA, postB) {
    return postA.timestamp - postB.timestamp;
  }
}

Posts.propTypes = {
  path: PropTypes.string.isRequired,
}

function mapStateToProps(state, props) {
  return {
    posts: !props.path ?
      state.posts.data :
      state.posts.data.filter(datum => {
        return datum.category === props.path
      }),
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);