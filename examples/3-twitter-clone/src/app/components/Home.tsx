import React from "react"

import { Composer } from "./Composer"
import { MessageWall } from "./MessageWall"

export const Home = () => (
  <>
    <div className="header">
      Share 🤯 experience...
      <br />
      <br />
      <Composer />
    </div>
    <MessageWall />
  </>
)
