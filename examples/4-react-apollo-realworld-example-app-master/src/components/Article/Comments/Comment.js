import { format } from 'date-fns'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../../Avatar'

const Comment = ({ comment, onDelete }) => {
  const { author } = comment
  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <Link to={`/profile/${author.username}`} className="comment-author">
          <Avatar src={author.image} className="comment-author-img" alt={author.username} />
        </Link>
        &nbsp;
        <Link to={`/profile/${author.username}`} className="comment-author">
          {author.username}
        </Link>
        <span className="date-posted">
          {format(Date.parse(comment.createdAt), 'MMM Do, YYYY')}
        </span>
        <span className="mod-options">
          <i
            className="ion-trash-a"
            role="button"
            tabIndex="0"
            onClick={() => onDelete()}
          />
        </span>
      </div>
    </div>
  )
}

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    author: PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      image: PropTypes.string
    }).isRequired
  }).isRequired,
  onDelete: PropTypes.func.isRequired
}

Comment.fragments = {
  comment: gql`
    fragment Comment on Comment {
      id
      body
      createdAt
      author {
        id
        username
        image
      }
    }
  `
}

export default Comment
