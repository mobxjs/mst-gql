import gql from 'graphql-tag'
import React, { Fragment } from 'react'
import { Mutation, Query } from 'react-apollo'
import Tab from '../Tab'
import WithViewer from '../WithViewer'
import Feed from './Feed'
import { GLOBAL_FEED, TAG_FEED, YOUR_FEED } from './feedTypes'

/* eslint-disable graphql/template-strings */
const GET_FEED_FILTER = gql`
  query FeedFilter {
    feedFilter @client {
      type
      tag
    }
  }
`
/* eslint-enable */

/* eslint-disable graphql/template-strings */
const CHANGE_FEED_FILTER = gql`
  mutation ChangeFeedFilter($type: String) {
    changeFeedFilter(type: $type) @client
  }
`
/* eslint-enable */

const FeedTabs = () => (
  <WithViewer>
    {viewer => (
      <Query query={GET_FEED_FILTER}>
        {({ data, loading, error }) => {
          if (error || loading) return null

          const feedType = data.feedFilter.type || (viewer ? YOUR_FEED : GLOBAL_FEED)
          const { tag } = data.feedFilter

          return (
            <Fragment>
              <div className="feed-toggle">
                <Mutation mutation={CHANGE_FEED_FILTER}>
                  {changeFeedFilter => (
                    <ul className="nav nav-pills outline-active">
                      {viewer && (
                        <Tab
                          active={feedType === YOUR_FEED}
                          onClick={() => changeFeedFilter({ variables: { type: YOUR_FEED } })}
                        >
                          Your Feed
                        </Tab>
                      )}

                      <Tab
                        active={feedType === GLOBAL_FEED}
                        onClick={() => changeFeedFilter({ variables: { type: GLOBAL_FEED } })}
                      >
                        Global Feed
                      </Tab>

                      {feedType === TAG_FEED && (
                        <Tab active>#{tag}</Tab>
                      )}
                    </ul>
                  )}
                </Mutation>
              </div>

              <Feed feedType={feedType} tag={tag} />
            </Fragment>
          )
        }}
      </Query>
    )}
  </WithViewer>
)

export default FeedTabs
