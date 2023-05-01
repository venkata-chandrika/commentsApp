import {Component} from 'react'

import {v4} from 'uuid'

import './index.css'

import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
class Comments extends Component {
  state = {
    nameInput: '',
    commentInput: '',
    commentsList: [],
  }

  onAddCommit = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    const initialBackgroundClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: v4(),
      nameInput,
      commentInput,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundClassName,
    }
    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachList => {
        if (eachList.id === id) {
          return {...eachList, isLiked: !eachList.isLiked}
        }
        return eachList
      }),
    }))
  }

  deleteComment = id => {
    const {commentsList} = this.state
    this.setState({commentsList: commentsList.filter(each => each.id !== id)})
  }

  renderCommentsList = () => {
    const {commentsList} = this.state
    return commentsList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        toggleIsLiked={this.toggleIsLiked}
        deleteComment={this.deleteComment}
      />
    ))
  }

  onNameInput = event => {
    this.setState({
      nameInput: event.target.value,
    })
  }

  onCommentInput = event => {
    this.setState({
      commentInput: event.target.value,
    })
  }

  render() {
    const {commentInput, nameInput, commentsList} = this.state
    return (
      <div className="container">
        <div className="comments-container">
          <h1>Comments</h1>
          <div className="input-comments">
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="comment-img"
            />
            <form onSubmit={this.onAddCommit} className="form">
              <p>say something about 4.0 Technologies</p>
              <input
                type="text"
                placeholder="Your Name"
                value={nameInput}
                onChange={this.onNameInput}
              />
              <textarea
                rows="10"
                cols="25"
                placeholder="Your Comment"
                value={commentInput}
                onChange={this.onCommentInput}
              />
              <button type="submit">Add Comment</button>
            </form>
          </div>
          <hr />
          <p className="heading">
            <span className="comments-count">{commentsList.length}</span>
            Comments
          </p>
          <ul className="comments-list">{this.renderCommentsList()}</ul>
        </div>
      </div>
    )
  }
}

export default Comments
