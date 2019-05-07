import { Field, Formik } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'

const CommentForm = ({ onSubmit }) => (
  <Formik
    initialValues={{
      body: ''
    }}
    onSubmit={onSubmit}
  >
    {({ isSubmitting, handleSubmit }) => (
      <form
        className="card comment-form"
        onSubmit={handleSubmit}
      >
        <fieldset disabled={isSubmitting}>
          <div className="card-block">
            <Field
              name="body"
              component="textarea"
              className="form-control"
              placeholder="Write a comment..."
              rows="3"
              required
            />
          </div>
          <div className="card-footer">
            <img src="" className="comment-author-img" alt="" />
            <button type="submit" className="btn btn-sm btn-primary">
              Post Comment
            </button>
          </div>
        </fieldset>
      </form>
    )}
  </Formik>
)

CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default CommentForm
