export abstract class QueryBuilder {
  __query: string = ""

  public constructor() {
    this.__attr("__typename", true)
    if (typeof (this as any).id === "function") (this as any).id()
  }

  protected __attr(attr: string, mutable?: boolean): this {
    return this._(attr, mutable)
  }

  public __clone() {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
  }

  // raw is exposed, to be able to add free form gql in the middle
  public _(str: string, mutable?: boolean): this {
    if (mutable || str === "id") {
      this.__query += `${str}\n`
      return this
    } else {
      const clone = this.__clone()
      clone.__query += `${str}\n`

      return clone
    }
  }

  protected __child<T extends QueryBuilder>(
    childName: string,
    childType: new () => T,
    builder?: string | ((q: T) => T) | T
  ): this {
    return this._(`${childName} {\n`).__buildChild(childType, builder)._(`}`)
  }

  // used for interfaces and unions
  protected __inlineFragment<T extends QueryBuilder>(
    childName: string,
    childType: new () => T,
    builder?: string | ((q: T) => T) | T
  ) {
    this._(`... on ${childName} {\n`)
    this.__buildChild(childType, builder)
    this._(`}`)
    return this
  }

  protected __buildChild<T extends QueryBuilder>(
    childType: new () => T,
    builder?: string | ((q: T) => T) | T
  ) {
    // already instantiated child builder
    if (builder instanceof QueryBuilder) {
      return this._(builder.toString())
    } else {
      const baseChildBuilder = new childType()
      const childBuilder =
        typeof builder === "string"
          ? baseChildBuilder._(builder)
          : typeof builder === "function"
          ? builder(baseChildBuilder)
          : baseChildBuilder
      return this._(childBuilder.toString())
    }
  }

  public toString() {
    return this.__query
  }
}
