import * as React from "react"
import { observer } from "mobx-react-lite"

import { Message as MessageModel } from "../models/Message"

export const Message = observer(
  ({ message }: { message: typeof MessageModel.Type }) => {
    return (
      <li>
        <h2>{message.user.name}</h2>
        <img src={message.user.avatar} width={200} height={200} />
        <p>{message.text}</p>
      </li>
    )
  }
)
