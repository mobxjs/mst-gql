import gql from 'graphql-tag'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import { Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'
import { transformGraphQLErrors } from '../../apolloHelpers'
import tokenStorage from '../../tokenStorage'
import Page from '../Page'
import WithViewer from '../WithViewer'
import LoginForm from './Form'

const SIGN_IN_USER = gql`
  mutation SignInUser($input: SignInUserInput!) {
    signInUser(input: $input) {
      token
      viewer {
        ...WithViewer
      }
      errors {
        message
      }
    }
  }
  ${WithViewer.fragments.viewer}
`

const GET_VIEWER = gql`
  query Viewer {
    viewer {
      ...WithViewer
    }
  }
  ${WithViewer.fragments.viewer}
`

const Login = ({ history }) => (
  <Page title="Sign in" className="auth-page">
    <div className="container page">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xs-12">
          <h1 className="text-xs-center">Sign in</h1>
          <p className="text-xs-center">
            <Link to="/register">Need an account?</Link>
          </p>
          <Mutation
            mutation={SIGN_IN_USER}
            update={(cache, { data: mutationData }) => {
              cache.writeQuery({
                query: GET_VIEWER,
                data: { viewer: mutationData.signInUser.viewer }
              })
            }}
          >
            {signInUser => (
              <LoginForm
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                  const { data: mutationData } = await signInUser({ variables: { input: values } })

                  setSubmitting(false)
                  setErrors(transformGraphQLErrors(mutationData.signInUser.errors))

                  if (!_.isEmpty(mutationData.signInUser.errors)) return

                  tokenStorage.write(mutationData.signInUser.token)
                  history.push('/')
                }}
              />
            )}
          </Mutation>
        </div>
      </div>
    </div>
  </Page>
)

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

export default Login
