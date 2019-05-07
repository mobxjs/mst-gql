import gql from 'graphql-tag'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { Mutation, Query } from 'react-apollo'
import { transformGraphQLErrors } from '../../apolloHelpers'
import tokenStorage from '../../tokenStorage'
import Page from '../Page'
import SettingsForm from './Form'

const USER_FRAGMENT = gql`
  fragment User on User {
    id
    username
    email
    image
    bio
  }
`

const GET_VIEWER = gql`
  query Viewer {
    viewer {
      user {
        ...User
      }
    }
  }
  ${USER_FRAGMENT}
`

const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      errors {
        message
      }
      user {
        ...User
      }
    }
  }
  ${USER_FRAGMENT}
`

const Settings = ({ history }) => (
  <Page title="Settings" className="settings-page">
    <div className="container page">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xs-12">
          <h1 className="text-xs-center">Your Settings</h1>
          <Query query={GET_VIEWER}>
            {({ loading, error, data, client }) => {
              if (loading || error) return 'Loading...'

              return (
                <Fragment>
                  <Mutation mutation={UPDATE_USER}>
                    {updateUser => (
                      <SettingsForm
                        user={data.viewer.user}
                        onSubmit={async (values, { setSubmitting, setErrors }) => {
                          const { data: mutationData } = await updateUser({
                            variables: { input: values }
                          })

                          setSubmitting(false)
                          setErrors(transformGraphQLErrors(mutationData.updateUser.errors))

                          if (!_.isEmpty(mutationData.updateUser.errors)) return

                          history.push(`/profile/${mutationData.updateUser.user.username}`)
                        }}
                      />
                    )}
                  </Mutation>
                  <hr />
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => {
                      tokenStorage.delete()
                      client.cache.reset()
                      history.push('/')
                    }}
                  >
                    Or click here to logout.
                  </button>
                </Fragment>
              )
            }}
          </Query>
        </div>
      </div>
    </div>
  </Page>
)

Settings.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

export default Settings
