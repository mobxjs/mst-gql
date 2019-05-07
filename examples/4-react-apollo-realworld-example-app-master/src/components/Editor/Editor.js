import { Field, Formik } from 'formik'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import FormErrors from '../FormErrors'
import TagsInput from './TagsInput'

const Editor = ({ article, onSubmit }) => (
  <div className="container page">
    <div className="row">
      <div className="col-md-10 offset-md-1 col-xs-12">
        <Formik
          initialValues={{
            title: article.title || '',
            description: article.description || '',
            body: article.body || '',
            tagList: article.tagList || []
          }}
          onSubmit={onSubmit}
        >
          {({ values, isSubmitting, handleSubmit, setFieldValue, errors }) => (
            <Fragment>
              <FormErrors errors={errors} />

              <form onSubmit={handleSubmit}>
                <fieldset disabled={isSubmitting}>
                  <fieldset className="form-group">
                    <Field
                      name="title"
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Article Title"
                      required
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <Field
                      name="description"
                      type="text"
                      className="form-control"
                      placeholder="What's this article about?"
                      required
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <Field
                      name="body"
                      component="textarea"
                      className="form-control"
                      rows="8"
                      placeholder="Write your article (in markdown)"
                      required
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <TagsInput
                      name="tagList"
                      tagList={values.tagList}
                      onChange={tagList => setFieldValue('tagList', tagList)}
                      className="form-control"
                      placeholder="Enter tags"
                    />
                  </fieldset>
                  <button type="submit" className="btn btn-lg pull-xs-right btn-primary">
                    Publish Article
                  </button>
                </fieldset>
              </form>
            </Fragment>
          )}
        </Formik>
      </div>
    </div>
  </div>
)

Editor.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    body: PropTypes.string,
    tagList: PropTypes.arrayOf(PropTypes.string)
  }),
  onSubmit: PropTypes.func.isRequired
}

Editor.defaultProps = {
  article: {}
}

export default Editor
