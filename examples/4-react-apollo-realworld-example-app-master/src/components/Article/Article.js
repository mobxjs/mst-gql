import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import Helmet from 'react-helmet'
import ReactMarkdown from 'react-markdown'
import Page from '../Page'
import ArticleComments from './Comments'
import ArticleMeta from './Meta'
import TagList from './TagList'

const GET_ARTICLE = gql`
  query Article($slug: String!) {
    article(slug: $slug) {
      id
      slug
      title
      body
      tagList
      ...ArticleMeta
    }
  }
  ${ArticleMeta.fragments.article}
`

const Article = ({ match: { params: { slug } } }) => (
  <Page title="Article" className="article-page">
    <Query query={GET_ARTICLE} variables={{ slug }}>
      {({ loading, error, data }) => {
        if (loading || error) return null

        const { article, viewer } = data

        return (
          <Fragment>
            <Helmet title={article.title} />

            <div className="banner">
              <div className="container">
                <h1>{article.title}</h1>
                <ArticleMeta article={article} viewer={viewer} />
              </div>
            </div>

            <div className="container page">
              <div className="row article-content">
                <div className="col-md-12">
                  <ReactMarkdown source={article.body} />
                  <TagList tagList={article.tagList} />
                </div>
              </div>

              <hr />

              <div className="article-actions">
                <ArticleMeta article={article} viewer={viewer} />
              </div>

              <div className="row">
                <div className="col-xs-12 col-md-8 offset-md-2">
                  <ArticleComments slug={article.slug} />
                </div>
              </div>
            </div>
          </Fragment>
        )
      }}
    </Query>
  </Page>
)

Article.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
}

export default Article
