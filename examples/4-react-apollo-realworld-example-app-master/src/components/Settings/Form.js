import { Field, Formik } from 'formik'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import FormErrors from '../FormErrors'

const SettingsForm = ({ user, onSubmit }) => (
  <Formik
    initialValues={{
      image: user.image || '',
      username: user.username || '',
      bio: user.bio || '',
      email: user.email || '',
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
                name="image"
                component="input"
                type="text"
                className="form-control"
                placeholder="URL of profile picture"
              />
            </fieldset>
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
                name="bio"
                component="textarea"
                className="form-control form-control-lg"
                rows="8"
                placeholder="Short bio about you"
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
              />
            </fieldset>
            <button type="submit" className="btn btn-lg btn-primary pull-xs-right">
              Update Settings
            </button>
          </fieldset>
        </form>
      </Fragment>
    )}
  </Formik>
)

SettingsForm.propTypes = {
  user: PropTypes.shape({
    image: PropTypes.string,
    username: PropTypes.string,
    bio: PropTypes.string,
    email: PropTypes.string
  }).isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default SettingsForm
