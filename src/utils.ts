export function getFirstValue(data: any) {
  const keys = Object.keys(data)
  if (keys.length !== 1)
    throw new Error(
      `Expected exactly one response key, got: ${keys.join(", ")}`
    )
  return data[keys[0]]
}
