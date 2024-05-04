import { Union } from "./union";
import { Equal } from "./utils";

export module Tuple {
  export type Includes<T extends readonly any[], U> = T extends readonly [
    infer First,
    ...infer Rest
  ]
    ? Equal<First, U> extends true
      ? true
      : Includes<Rest, U>
    : false;

  type _Merge<T extends any[], K extends any[]> = K extends [
    infer A,
    ...infer B
  ]
    ? Includes<T, A> extends true
      ? _Merge<T, B>
      : _Merge<[...T, A], B>
    : T;

  export type Merge<T extends any[][], R extends any[] = []> = T extends [
    infer A extends any[],
    ...infer B extends any[][]
  ]
    ? Merge<B, _Merge<R, A>>
    : R;

  export type IncludesAll<T extends any[][], V> = T extends [
    infer A extends any[],
    ...infer R extends any[][]
  ]
    ? Includes<A, V> extends false
      ? false
      : IncludesAll<R, V>
    : true;

  type _JoinArray<
    T extends any[],
    E extends any[][],
    K extends any[] = []
  > = T extends [infer V, ...infer R extends any[]]
    ? IncludesAll<E, V> extends true
      ? _JoinArray<R, E, [...K, V]>
      : _JoinArray<R, E, K>
    : K;

  export type Join<T extends any[]> = Union.IsUnion<T> extends false
    ? T
    : Union.ToTuple<T> extends infer TT extends any[][]
    ? Merge<TT> extends infer All extends any[]
      ? _JoinArray<All, TT>
      : never
    : never;

  export type IsSubArray<
    T extends any[],
    K extends readonly any[]
  > = T extends [...K, ...infer _R]
    ? true
    : T["length"] extends K["length"]
    ? false
    : T extends [infer _A, ...infer R]
    ? IsSubArray<R, K>
    : false;

  export type Push<T extends any[], V> = [...T, V];

  /**
   * Get first item.
   */
  export type First<T, Default = never> = T extends [infer F, ...infer _R]
    ? F
    : Default;

  /**
   * Get last item.
   */
  export type Last<T, Default = never> = T extends [...infer _F, infer L]
    ? L
    : Default;
}
