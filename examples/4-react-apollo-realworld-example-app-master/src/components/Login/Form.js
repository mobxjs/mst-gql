import { Field, Formik } from 'formik'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import FormErrors from '../FormErrors'

const LoginForm = ({ onSubmit }) => (
  <Formik
    initialValues={{
      email: '',
      password: ''
    }}
    onSubmit={onSubmit}
  >
    {({ handleSubmit, isSubmitting, errors }) => (
      <Fragment>
        <FormErrors errors={errors} />

        <form onSubmit={handleSubmit}>
          <fieldset disabled={isSubmitting}>
            <fieldset className="form-group">
              <Field
                name="email"
                component="input"
                type="email"
                placeholder="Email"
                className="form-control form-control-lg"
                required
              />
            </fieldset>
            <fieldset className="form-group">
              <Field
                name="password"
                component="input"
                type="password"
                placeholder="Password"
                className="form-control form-control-lg"
                required
              />
            </fieldset>
            <button type="submit" className="btn btn-lg btn-primary pull-xs-right">
              Sign in
            </button>
          </fieldset>
        </form>
      </Fragment>
    )}
  </Formik>
)

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default LoginForm
