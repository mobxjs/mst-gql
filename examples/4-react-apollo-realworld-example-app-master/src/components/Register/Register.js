import gql from 'graphql-tag'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import { Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'
import { transformGraphQLErrors } from '../../apolloHelpers'
import Page from '../Page'
import Form from './Form'

const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      errors {
        message
      }
    }
  }
`

const Register = ({ history }) => (
  <Page title="Sign up" className="auth-page">
    <div className="container page">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xs-12">
          <h1 className="text-xs-center">Sign up</h1>
          <p className="text-xs-center">
            <Link to="/login">Have an account?</Link>
          </p>
          <Mutation mutation={CREATE_USER}>
            {createUser => (
              <Form
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                  const { data } = await createUser({ variables: { input: values } })

                  setSubmitting(false)
                  setErrors(transformGraphQLErrors(data.createUser.errors))

                  if (!_.isEmpty(data.createUser.errors)) return

                  history.push('/login')
                }}
              />
            )}
          </Mutation>
        </div>
      </div>
    </div>
  </Page>
)

Register.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

export default Register
