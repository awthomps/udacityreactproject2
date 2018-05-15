import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostOverview from './PostOverview'

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortByTimestamp: true,
    }
  }

  render() {
    const { posts } = this.props;
    let sortedPosts = posts;
    // console.log(this.state.sortByTimestamp);
    if(this.state.sortByTimestamp) {
      sortedPosts.sort(this.timestampSort);
      // console.log('time');
    } else {
      sortedPosts.sort(this.voteScoreSort);
      // console.log('vote');
    }
    return (
      <div>
          <select onChange={this.setSortMethod}>
            <option value='true' defaultValue>Sort By Date</option>
            <option value='false'>Sort by Score</option>
          </select>
          {sortedPosts.map(post => {
            return <PostOverview key={`post-${post.id}`} id={post.id}/>
          })}
      </div>
    );
  }
  

  setSortMethod = (event) => {this.setState({sortByTimestamp: event.target.value === 'true'})}

  // sortMethod(postA, postB) {
  //   if(this.state.sortByTimestamp) {
  //     return this.timestampSort(postA, postB)
  //   } else {
  //     return this.voteScoreSort(postA, postB);
  //   }
  // }
  
  voteScoreSort(postA, postB) {
    console.log(postA.voteScore + ' ' + postB.voteScore);
    return postA.voteScore - postB.voteScore;
  }
  
  timestampSort(postA, postB) {
    console.log(postA.timestamp + ' ' + postB.timestamp);
    return postA.timestamp - postB.timestamp;
  }
}

Posts.propTypes = {
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

function mapStateToProps(state, props) {
  return {
    posts: !props.path ?
      state.posts.data :
      state.posts.data.filter(datum => {
        return datum.category === props.name
      }),
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);