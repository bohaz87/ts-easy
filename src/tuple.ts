import { IsUnion, ToTuple } from "./union";
import { Equal } from "./utils";

/**
 * Return trun if array include the item, like Array.includes
 *
 * @example
 * ```typescript
 * import { Includes } from 'ts-easy/tuple';
 *
 * type Included = Includes<[1, 2, 3], [3]> // true
 * type Included = Includes<[any, never, unknown], [never]> // true
 * ```
 */
export type Includes<T extends readonly any[], U> = T extends readonly [
  infer First,
  ...infer Rest
]
  ? Equal<First, U> extends true
    ? true
    : Includes<Rest, U>
  : false;

type _Merge<T extends any[], K extends any[]> = K extends [infer A, ...infer B]
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

type _ToInter<
  T extends any[],
  E extends any[][],
  K extends any[] = []
> = T extends [infer V, ...infer R extends any[]]
  ? IncludesAll<E, V> extends true
    ? _ToInter<R, E, [...K, V]>
    : _ToInter<R, E, K>
  : K;

/**
 * Get the intersection of the array union.
 *
 * The item order of the result depends on the item order of the first element.
 *
 * @example
 * ```typescript
 * type Inter = ToIntersection<[1, 2, 3] | [3, 4, 5]> // [3]
 * ```
 *
 *
 * @example
 *
 * Convert the type param to union first if it's an array using T[number]
 *
 * ```typescript
 * type Arr = [[3, any, never], [4, never, any]]
 * type Inter = ToIntersection<T[number]> // [any, never]
 * ```
 */
export type ToIntersection<ArrayUnion extends any[]> =
  IsUnion<ArrayUnion> extends false
    ? ArrayUnion
    : ToTuple<ArrayUnion> extends infer TT extends any[][]
    ? Merge<TT> extends infer All extends any[]
      ? _ToInter<All, TT>
      : never
    : never;

export type IsSubArray<T extends any[], K extends readonly any[]> = T extends [
  ...K,
  ...infer _R
]
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

/**
 * Join the array items to string, like javascript Array.prototype.join
 *
 * @example
 * type str = Join<['a', 'b', 'c']> // 'a, b, c'
 *
 * type str = Join<['a', 'b', 'c'] '-'> // 'a-b-c'
 */
export type Join<
  T extends (string | number)[],
  S extends string = ", ",
  R extends string = ""
> = T extends [
  infer A extends string | number,
  ...infer B extends (string | number)[]
]
  ? Join<B, S, `${R}${R extends "" ? "" : S}${A}`>
  : R;
