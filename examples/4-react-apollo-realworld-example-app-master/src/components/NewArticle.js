import gql from 'graphql-tag'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import { Mutation } from 'react-apollo'
import { transformGraphQLErrors } from '../apolloHelpers'
import Editor from './Editor'
import Page from './Page'

const CREATE_ARTICLE = gql`
  mutation CreateArticle($input: CreateArticleInput!) {
    createArticle(input: $input) {
      article {
        id
        slug
        title
        description
        body
        tagList
      }
      errors {
        message
      }
    }
  }
`

const NewArticle = ({ history }) => (
  <Mutation mutation={CREATE_ARTICLE}>
    {createArticle => (
      <Page title="Editor" className="editor-page">
        <Editor
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            const { data } = await createArticle({ variables: { input: values } })

            setSubmitting(false)
            setErrors(transformGraphQLErrors(data.createArticle.errors))

            if (!_.isEmpty(data.createArticle.errors)) return

            const slug = _.get(data, 'createArticle.article.slug')
            history.push(`/article/${slug}`)
          }}
        />
      </Page>
    )}
  </Mutation>
)

NewArticle.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

export default NewArticle
