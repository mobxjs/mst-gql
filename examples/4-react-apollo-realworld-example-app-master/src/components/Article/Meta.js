import { format } from 'date-fns'
import gql from 'graphql-tag'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import WithViewer from '../WithViewer'
import AuthorActions from './AuthorActions'
import UserActions from './UserActions'
import Avatar from '../Avatar'

const ArticleMeta = ({ article }) => {
  const { author } = article

  return (
    <WithViewer>
      {viewer => (
        <div className="article-meta">
          <Link to={`/profile/${author.username}`}>
            <Avatar src={author.image} alt={author.username} />
          </Link>
          <div className="info">
            <Link to={`/profile/${author.username}`} className="author">
              {author.username}
            </Link>
            <span className="date">
              {format(Date.parse(article.createdAt), 'MMMM Do, YYYY')}
            </span>
          </div>

          {_.get(viewer, 'user.id') === author.id
            ? <AuthorActions article={article} />
            : <UserActions article={article} />
          }
        </div>
      )}
    </WithViewer>
  )
}

ArticleMeta.propTypes = {
  article: PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    author: PropTypes.shape({
      username: PropTypes.string.isRequired,
      image: PropTypes.string
    }).isRequired
  }).isRequired
}

ArticleMeta.fragments = {
  article: gql`
    fragment ArticleMeta on Article {
      createdAt
      author {
        id
        username
        image
      }
      ...UserActions
    }
    ${UserActions.fragments.article}
  `
}

export default ArticleMeta
