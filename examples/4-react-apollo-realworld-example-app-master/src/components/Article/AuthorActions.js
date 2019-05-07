import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { Mutation } from 'react-apollo'
import { Link, withRouter } from 'react-router-dom'

const DELETE_ARTICLE = gql`
  mutation DeleteArticle($input: DeleteArticleInput!) {
    deleteArticle(input: $input) {
      article {
        id
      }
    }
  }
`

const AuthorActions = ({ history, article }) => (
  <Fragment>
    <Link to={`/editor/${article.slug}`} className="btn btn-sm btn-outline-secondary">
      <i className="ion-edit" />
      &nbsp;
      Edit Article
    </Link>
    &nbsp;
    <Mutation
      mutation={DELETE_ARTICLE}
      onCompleted={() => history.push('/')}
    >
      {deleteArticle => (
        <button
          type="button"
          className="btn btn-sm btn-outline-danger"
          onClick={() => deleteArticle({ variables: { input: { id: article.id } } })}
        >
          <i className="ion-trash-a" />
          &nbsp;
          Delete Article
        </button>
      )}
    </Mutation>
  </Fragment>
)

AuthorActions.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

export default withRouter(AuthorActions)
