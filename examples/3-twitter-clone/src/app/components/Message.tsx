import * as React from "react"
import { observer } from "mobx-react-lite"

import { MessageModelType } from "../models/"

export const Message = observer(
  ({ message }: { message: MessageModelType }) => {
    return (
      <li>
        <h2>{message.user.name}</h2>
        <img src={message.user.avatar} width={200} height={200} />
        <p>{message.text}</p>
        {message.isLikedByMe ? "YES" : "NO"}
        <button onClick={() => message.like()}>Like</button>
      </li>
    )
  }
)
