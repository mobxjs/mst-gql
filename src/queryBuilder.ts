type QueryBuilderState = {
  stack: QueryBuilder<any>[]
  query: string
}

export abstract class QueryBuilder<PARENT = never> {
  __qb: QueryBuilderState

  public constructor(__qb?: QueryBuilderState) {
    this.__qb = __qb || { stack: [], query: "" }
    this.__attr("__typename")
    if (typeof (this as any).id === "function") (this as any).id()
  }

  public __attr(attr: string): this {
    this.__raw(attr)
    return this
  }

  public __raw(str: string) {
    this.__qb.query += `${"".padStart(this.__qb.stack.length * 2)}${str}\n`
  }

  public __child<CHILD_BUILDER extends QueryBuilder<this>>(
    childName: string,
    childType: new (__qgs: QueryBuilderState) => CHILD_BUILDER
  ): CHILD_BUILDER {
    this.__raw(`${childName} {`)
    this.__qb.stack.unshift(this)
    const res = new childType(this.__qb)
    return res
  }

  public close(): PARENT {
    if (!this.__qb.stack.length)
      throw new Error("Cannot close top level element")
    this.__qb.stack.shift()
    this.__raw("}")
    return this.__qb.stack[0] as any
  }

  public build(): string {
    if (!this.__qb.stack.length)
      throw new Error("Some elements where not closed yet")
    return this.toString()
  }

  public toString() {
    return this.__qb.query
  }
}
