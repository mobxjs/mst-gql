import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import Footer from './Footer'
import Header from './Header'

const Page = ({ children, title, ...otherProps }) => (
  <Fragment>
    <Helmet title={`${title} — Conduit`} />
    <Header />
    <div {...otherProps}>
      {children}
    </div>
    <Footer />
  </Fragment>
)

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
}

export default Page
