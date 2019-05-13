import * as React from "react"

export const Message = ({ message }: any) => {
  return (
    <li>
      <h2>{message.user.name}</h2>
      <img src={message.user.avatar} width={200} height={200} />
      <p>{message.text}</p>
    </li>
  )
}
