import PropTypes from 'prop-types'
import React from 'react'

const Tag = ({ children, onClick }) => (
  <a
    href=""
    className="tag-pill tag-default"
    onClick={(event) => {
      event.preventDefault()
      onClick()
    }}
  >
    {children}
  </a>
)

Tag.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Tag
