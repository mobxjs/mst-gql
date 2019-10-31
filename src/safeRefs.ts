import { IAnyModelType, IModelType } from "mobx-state-tree"

type Without<T, K> = Pick<T, Exclude<keyof T, K>>

type SafeRefsModelType<T extends IAnyModelType, OTHERS> = T extends IModelType<
  infer P,
  infer O,
  infer C,
  infer S
>
  ? IModelType<Without<P, keyof OTHERS>, O & OTHERS, C, S>
  : never

export function safeRefs<REFS>() {
  return function<T extends IAnyModelType>(model: T) {
    return (model as unknown) as SafeRefsModelType<T, REFS>
  }
}
