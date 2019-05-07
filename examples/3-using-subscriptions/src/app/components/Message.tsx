import React, { FC } from "react"
import { Message as MessageModel } from "../models/Message"

export const Message: FC<typeof MessageModel.Type> = props => (
  <div className="notif">
    <h4>{props.from}</h4>
    <li>{props.message}</li>
  </div>
)
