import React, { useContext } from "react"
import styled from "react-emotion"

import { menuItemClassName } from "../components/menu-item"
import { ReactComponent as ExitIcon } from "../assets/icons/exit.svg"
import { StoreContext } from "../models"

export default function LogoutButton() {
  const store = useContext(StoreContext)
  return (
    <StyledButton onClick={store.logout}>
      <ExitIcon />
      Logout
    </StyledButton>
  )
}

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const StyledButton = styled("button")(menuItemClassName, {
  background: "none",
  border: "none",
  padding: 0
})
