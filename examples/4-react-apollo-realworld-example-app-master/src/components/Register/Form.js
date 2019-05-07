import { Field, Formik } from 'formik'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import FormErrors from '../FormErrors'

const RegistrationForm = ({ onSubmit }) => (
  <Formik
    initialValues={{
      username: '',
      email: '',
      password: ''
    }}
    onSubmit={onSubmit}
  >
    {({ handleSubmit, isSubmitting, errors }) => (
      <Fragment>
        <form onSubmit={handleSubmit}>
          <FormErrors errors={errors} />

          <fieldset disabled={isSubmitting}>
            <fieldset className="form-group">
              <Field
                name="username"
                component="input"
                type="text"
                className="form-control form-control-lg"
                placeholder="Your Name"
                required
              />
            </fieldset>
            <fieldset className="form-group">
              <Field
                name="email"
                component="input"
                type="text"
                className="form-control form-control-lg"
                placeholder="Email"
                required
              />
            </fieldset>
            <fieldset className="form-group">
              <Field
                name="password"
                component="input"
                type="password"
                className="form-control form-control-lg"
                placeholder="Password"
                required
              />
            </fieldset>
            <button type="submit" className="btn btn-lg btn-primary pull-xs-right">
              Sign up
            </button>
          </fieldset>
        </form>
      </Fragment>
    )}
  </Formik>
)

RegistrationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default RegistrationForm
