import * as React from "react"
import { useState } from "react"
import { observer } from "mobx-react-lite"

import { MessageModelType } from "../models/"
import { Replies } from "./Replies"

// @ts-ignore
import chuck from "../avatars/chuck.jpg"
// @ts-ignore
import michel from "../avatars/michel.jpg"

const images = {
  michel,
  chuck
}

export const Message = observer(
  ({ message, asChild }: { message: MessageModelType; asChild?: boolean }) => {
    const [collapsed, setCollapsed] = useState(true)
    return (
      <li className="message">
        <img src={images[message.user.avatar]} width={200} height={200} />
        <div className="content">
          <h4>{message.user.name}</h4>
          <p>{message.text}</p>
          <div className="buttons">
            <div
              className={message.isLikedByMe ? "like liked" : "like"}
              onClick={message.like}
            >
              💙
            </div>
            {asChild ? null : (
              <div className="collapse" onClick={() => setCollapsed((c) => !c)}>
                💬
              </div>
            )}
          </div>
        </div>
        {collapsed ? null : <Replies message={message} />}
      </li>
    )
  }
)
