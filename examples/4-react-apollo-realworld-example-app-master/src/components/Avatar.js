import React from 'react'
import PropTypes from 'prop-types'

const placeholderImageUrl = 'https://static.productionready.io/images/smiley-cyrus.jpg'

// eslint-disable-next-line jsx-a11y/alt-text
const Avatar = ({ src, ...otherProps }) => <img src={src || placeholderImageUrl} {...otherProps} />

Avatar.propTypes = {
  src: PropTypes.string // eslint-disable-line react/require-default-props
}

export default Avatar
