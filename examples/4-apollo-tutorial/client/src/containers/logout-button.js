import React from "react"
import styled from "react-emotion"

import { withStore } from "../storeContext"
import { menuItemClassName } from "../components/menu-item"
import { ReactComponent as ExitIcon } from "../assets/icons/exit.svg"

export default function LogoutButton() {
  return withStore(store => (
    <StyledButton onClick={store.Logout}>
      <ExitIcon />
      Logout
    </StyledButton>
  ))
}

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const StyledButton = styled("button")(menuItemClassName, {
  background: "none",
  border: "none",
  padding: 0
})
