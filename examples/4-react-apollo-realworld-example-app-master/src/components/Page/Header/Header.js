import React from 'react'
import { NavLink } from 'react-router-dom'
import Menu from './Menu'

const Header = () => (
  <nav className="navbar navbar-light">
    <div className="container">
      <NavLink to="/" className="navbar-brand">conduit</NavLink>
      <Menu />
    </div>
  </nav>
)

export default Header
