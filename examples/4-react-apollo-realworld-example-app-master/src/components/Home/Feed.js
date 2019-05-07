import gql from 'graphql-tag'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import { Query } from 'react-apollo'
import ApolloInfiniteScroll from '../ApolloInfiniteScroll'
import ArticlePreview from '../ArticlePreview'
import { GLOBAL_FEED, TAG_FEED, YOUR_FEED } from './feedTypes'

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

const GET_FEED = gql`
  query Feed($cursor: String) {
    viewer {
      feed(first: 10, after: $cursor) {
        ...Articles
      }
    }
  }
  ${ARTICLES_CONNECTION_FRAGMENT}
`

const GET_ARTICLES = gql`
  query Articles($tag: String, $cursor: String) {
    articles(tag: $tag, first: 10, after: $cursor) {
      ...Articles
    }
  }
  ${ARTICLES_CONNECTION_FRAGMENT}
`

const Feed = ({ feedType, tag }) => (
  <Query
    query={feedType === YOUR_FEED ? GET_FEED : GET_ARTICLES}
    variables={feedType === TAG_FEED ? { tag } : {}}
    fetchPolicy="cache-and-network"
  >
    {({ loading, error, data, fetchMore }) => {
      const connectionPath = feedType === YOUR_FEED ? 'viewer.feed' : 'articles'
      const articles = _.get(data, connectionPath)

      if (error || !articles) {
        return (
          <div className="article-preview">
            Loading feed...
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
          connectionPath={connectionPath}
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

Feed.propTypes = {
  feedType: PropTypes.oneOf([YOUR_FEED, GLOBAL_FEED, TAG_FEED]).isRequired,
  tag: PropTypes.string
}

Feed.defaultProps = {
  tag: null
}

export default Feed
