import * as React from "react"
import { useState } from "react"
import { observer } from "mobx-react-lite"

import { Query } from "mst-gql"

import { Message as MessageModel } from "../models/Message"

export const Message = observer(
  ({ message }: { message: typeof MessageModel.Type }) => {
    return (
      <li>
        <h2>{message.user.name}</h2>
        <p>{message.text}</p>
      </li>
    )
  }
)
