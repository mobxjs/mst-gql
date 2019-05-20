import * as React from "react"
import { useState } from "react"
import { observer } from "mobx-react-lite"

import { MessageModelType } from "../models/"
import { Replies } from "./Replies"

export const Message = observer(
  ({ message, asChild }: { message: MessageModelType; asChild?: boolean }) => {
    const [collapsed, setCollapsed] = useState(true)
    return (
      <li>
        <h2>{message.user.name}</h2>
        <img src={message.user.avatar} width={200} height={200} />
        <p>{message.text}</p>
        {message.isLikedByMe ? "YES" : "NO"}
        <button onClick={() => message.like()}>Like</button>
        {asChild ? null : (
          <button onClick={() => setCollapsed(c => !c)}>Show replies</button>
        )}
        {collapsed ? null : <Replies message={message} />}
      </li>
    )
  }
)
