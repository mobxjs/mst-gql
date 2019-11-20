import { IAnyModelType, IModelType } from "mobx-state-tree"

type Without<T, K> = Pick<T, Exclude<keyof T, K>>

type WithRefsModelType<T extends IAnyModelType, OTHERS> = T extends IModelType<
  infer P,
  infer O,
  infer C,
  infer S
>
  ? IModelType<Without<P, keyof OTHERS>, O & OTHERS, C, S>
  : never

export function withTypedRefs<REFS>() {
  return function<T extends IAnyModelType>(model: T) {
    return (model as unknown) as WithRefsModelType<T, REFS>
  }
}
