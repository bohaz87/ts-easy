export type ToIntersection<U> = (U extends U ? (a: U) => 0 : never) extends (
  a: infer I
) => 0
  ? I
  : never;

export type LastUnion<U> = ToIntersection<
  U extends U ? (a: U) => 0 : never
> extends (a: infer L) => 0
  ? L
  : never;

export type IsUnion<T, B extends T = T> = (
  T extends T ? (B extends T ? true : unknown) : never
) extends true
  ? false
  : true;

type _UnionToTuple<U, Last = LastUnion<U>> = [U] extends [never]
  ? []
  : [..._UnionToTuple<Exclude<U, Last>>, Last];

export type ToTuple<U> = _UnionToTuple<Exclude<U, never>>;
