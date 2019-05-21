import React, { FC } from "react"

export const Error: FC = props => (
  <div className="error">{props.children || "Something went wrong"}</div>
)
