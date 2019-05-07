import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

const FormErrors = ({ errors }) => {
  if (_.isEmpty(errors)) return null

  return (
    <ul className="error-messages">
      {Object.values(errors).map(error => <li key={error}>{error}</li>)}
    </ul>
  )
}

FormErrors.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object.isRequired
}

export default FormErrors
