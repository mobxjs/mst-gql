import update from 'immutability-helper'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'

export const mergePaginatedData = (connectionPath, previousData, newData) => (
  update(
    previousData,
    _.set({}, connectionPath, {
      $merge: _.get(newData, connectionPath),
      edges: {
        $push: _.get(newData, connectionPath).edges
      }
    })
  )
)

const ApolloInfiniteScroll = ({
  data, connectionPath, loading, fetchMore, children, threshold
}) => {
  const connection = _.get(data, connectionPath)
  const nodes = _.map(connection.edges, 'node')
  const { pageInfo } = connection

  if (!pageInfo || pageInfo.hasNextPage === undefined || pageInfo.endCursor === undefined) {
    throw new Error('ApolloInfiniteScroll connection must include pageInfo { hasNextPage endCursor }')
  }

  return (
    <InfiniteScroll
      initialLoad={false}
      threshold={threshold}
      hasMore={pageInfo.hasNextPage}
      loadMore={() => {
        if (loading) { return }

        fetchMore({
          variables: {
            cursor: pageInfo.endCursor
          },
          updateQuery: (previousResult, { fetchMoreResult }) => (
            mergePaginatedData(connectionPath, previousResult, fetchMoreResult)
          )
        })
      }}
    >
      {nodes.map(children)}
    </InfiniteScroll>
  )
}

ApolloInfiniteScroll.propTypes = {
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  connectionPath: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  fetchMore: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
  threshold: PropTypes.number
}

ApolloInfiniteScroll.defaultProps = {
  threshold: 0
}

export default ApolloInfiniteScroll
