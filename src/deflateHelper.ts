export function deflateHelper(store: any, data: any) {
  function deflate(data: any): any {
    if (!data || typeof data !== "object") return data
    if (Array.isArray(data)) return data.map(deflate)

    const { __typename } = data


    if (__typename && store.isRootType(__typename)) {
      // GQL object with root type, keep only __typename & identifier
      const typeDef = store.getTypeDef(__typename)
      const idName = typeDef.identifierAttribute ?? 'id'
      return { __typename, [idName]: data[idName] }
    } else {
      // GQL object with non-root type, return object with all props deflated
      const snapshot: any = {}
      for (const key in data) {
        snapshot[key] = deflate(data[key])
      }
      return snapshot
    }
  }

  return deflate(data)
}
