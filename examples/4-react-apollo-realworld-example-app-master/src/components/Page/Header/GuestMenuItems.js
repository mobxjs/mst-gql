import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'

const GuestMenuItems = () => (
  <Fragment>
    <li className="nav-item">
      <NavLink to="/" exact className="nav-link">Home</NavLink>
    </li>
    <li className="nav-item">
      <NavLink to="/login" className="nav-link">Sign in</NavLink>
    </li>
    <li className="nav-item">
      <NavLink to="/register" className="nav-link">Sign up</NavLink>
    </li>
  </Fragment>
)

export default GuestMenuItems
