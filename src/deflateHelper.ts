export function deflateHelper(store: any, data: any) {
  function deflate(data: any): any {
    if (!data || typeof data !== "object") return data
    if (Array.isArray(data)) return data.map(deflate)

    const { __typename, id } = data

    // GQL object
    if (__typename && store.isKnownType(__typename)) {
      // GQL object with known type, keep only __typename & id
      return { __typename, id }
    } else {
      // GQL object with unknown type, return object with all props deflated
      const snapshot: any = {}
      for (const key in data) {
        snapshot[key] = deflate(data[key])
      }
      return snapshot
    }
  }

  return deflate(data)
}
