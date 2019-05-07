import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'

class TagsInput extends Component {
  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      const value = event.target.value.trim()
      const { tagList, onChange } = this.props

      if (value === '') return
      if (tagList.includes(value)) return

      onChange([...tagList, value])

      // eslint-disable-next-line no-param-reassign
      event.target.value = ''
    }
  }

  handleDeleteClick = (deletedTag) => {
    const { tagList, onChange } = this.props
    onChange(tagList.filter(tag => tag !== deletedTag))
  }

  render() {
    const { tagList, onChange, ...otherProps } = this.props

    return (
      <Fragment>
        <input
          type="text"
          onKeyPress={this.handleKeyPress}
          {...otherProps}
        />
        <div className="tag-list">
          {tagList.map(tag => (
            <span key={tag} className="tag-default tag-pill">
              <i
                className="ion-close-round"
                role="button"
                tabIndex="0"
                onClick={() => this.handleDeleteClick(tag)}
              />
              {tag}
            </span>
          ))}
        </div>
      </Fragment>
    )
  }
}

TagsInput.propTypes = {
  tagList: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired
}

export default TagsInput
