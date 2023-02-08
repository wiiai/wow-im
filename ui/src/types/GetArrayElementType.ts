export type GetArrayElementType<T extends any[]> = T extends (infer U)[]
  ? U
  : never;