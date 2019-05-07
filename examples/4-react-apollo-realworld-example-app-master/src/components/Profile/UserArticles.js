import gql from 'graphql-tag'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import { Query } from 'react-apollo'
import ApolloInfiniteScroll from '../ApolloInfiniteScroll'
import ArticlePreview from '../ArticlePreview'

export const MY_ARTICLES = 'MY_ARTICLES'
export const FAVORITED_ARTICLES = 'FAVORITED_ARTICLES'

const ARTICLES_CONNECTION_FRAGMENT = gql`
  fragment Articles on ArticleConnection {
    edges {
      node {
        id
        ...ArticlePreview
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
  ${ArticlePreview.fragments.article}
`

const GET_USER_ARTICLES = gql`
  query UserArticles($username: String!, $cursor: String) {
    user(username: $username) {
      id
      articles(first: 10, after: $cursor) {
        ...Articles
      }
    }
  }
  ${ARTICLES_CONNECTION_FRAGMENT}
`

const GET_FAVORITE_ARTICLES = gql`
  query FavoriteArticles($username: String!, $cursor: String) {
    user(username: $username) {
      id
      articles: favoriteArticles(first: 10, after: $cursor) {
        ...Articles
      }
    }
  }
  ${ARTICLES_CONNECTION_FRAGMENT}
`

const UserArticles = ({ username, type }) => (
  <Query
    query={type === FAVORITED_ARTICLES ? GET_FAVORITE_ARTICLES : GET_USER_ARTICLES}
    variables={{ username }}
    fetchPolicy="cache-and-network"
  >
    {({ loading, error, data, fetchMore }) => {
      const articles = _.get(data, 'user.articles')

      if (error || !articles) {
        return (
          <div className="article-preview">
            Loading articles...
          </div>
        )
      }

      if (articles.edges.length === 0) {
        return (
          <div className="article-preview">
            No articles are here... yet.
          </div>
        )
      }

      return (
        <ApolloInfiniteScroll
          data={data}
          connectionPath="user.articles"
          loading={loading}
          fetchMore={fetchMore}
          threshold={500}
        >
          {article => <ArticlePreview article={article} key={article.id} />}
        </ApolloInfiniteScroll>
      )
    }}
  </Query>
)

UserArticles.propTypes = {
  username: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

export default UserArticles
