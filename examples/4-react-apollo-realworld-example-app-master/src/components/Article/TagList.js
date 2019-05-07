import PropTypes from 'prop-types'
import React from 'react'

const TagList = ({ tagList }) => (
  <ul className="tag-list">
    {tagList.map(tag => (
      <li key={tag} className="tag-default tag-pill tag-outline">{tag}</li>
    ))}
  </ul>
)

TagList.propTypes = {
  tagList: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default TagList
