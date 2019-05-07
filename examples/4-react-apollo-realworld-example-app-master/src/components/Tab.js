import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

const Tab = ({ children, active, onClick }) => (
  <li className="nav-item">
    <a
      className={classNames('nav-link', { active })}
      href=""
      onClick={(event) => {
        event.preventDefault()
        onClick()
      }}
    >
      {children}
    </a>
  </li>
)

Tab.propTypes = {
  children: PropTypes.node.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func
}

Tab.defaultProps = {
  onClick: () => {}
}

export default Tab
