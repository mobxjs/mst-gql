import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React from 'react'
import { Query } from 'react-apollo'

const USER_FRAGMENT = gql`
  fragment WithViewer on Viewer {
    user {
      id
      username
      email
      image
      bio
    }
  }
`

const GET_VIEWER = gql`
  query Viewer {
    viewer {
      ...WithViewer
    }
  },
  ${USER_FRAGMENT}
`

const WithViewer = ({ children }) => (
  <Query query={GET_VIEWER}>
    {({ loading, error, data }) => {
      if (loading || error) return null
      return children(data.viewer)
    }}
  </Query>
)

WithViewer.propTypes = {
  children: PropTypes.func.isRequired
}

WithViewer.fragments = {
  viewer: USER_FRAGMENT
}

export default WithViewer
