import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import Page from '../Page'
import FeedTabs from './FeedTabs'
import PopularTags from './PopularTags'

/* eslint-disable graphql/template-strings */
const CHANGE_FEED_FILTER = gql`
  mutation ChangeFeedFilter($type: String) {
    changeFeedFilter(type: $type) @client
  }
`
/* eslint-enable */

class Home extends Component {
  componentWillUnmount() {
    const { client } = this.props

    client.mutate({
      mutation: CHANGE_FEED_FILTER,
      variables: { type: null }
    })
  }

  render() {
    return (
      <Page title="Home" className="home-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <FeedTabs />
            </div>

            <div className="col-md-3">
              <div className="sidebar">
                <PopularTags />
              </div>
            </div>
          </div>
        </div>
      </Page>
    )
  }
}

Home.propTypes = {
  client: PropTypes.shape({
    mutate: PropTypes.func.isRequired
  }).isRequired
}

export default withApollo(Home)
