declare module "string" {
    /**
     * Get first character
     */
    export type First<S extends string, Default = never> = S extends `${infer F}${infer _R}` ? F : Default;
    /**
     * Get last character
     */
    export type Last<S extends string, Default = never> = S extends `${infer H}${infer L}` ? L extends "" ? H : Last<L, Default> : Default;
    type _RepeatString<S extends string, N extends number, C extends number[] = [], R extends string = ""> = C["length"] extends N ? R : _RepeatString<S, N, [...C, 0], `${R}${S}`>;
    /**
     * Repeat a string N times
     */
    export type Repeat<S extends string, N extends number> = S extends "" ? S : _RepeatString<S, N>;
    export type Trim<S extends string, Space extends string = " " | "\n" | "\t"> = S extends `${Space}${infer R}` | `${infer R}${Space}` ? Trim<R> : S;
    export type Replace<S extends string, From extends string, To extends string> = From extends "" ? S : S extends `${infer start}${From}${infer end}` ? `${start}${To}${end}` : S;
    export type ReplaceAll<S extends string, From extends string, To extends string> = From extends "" ? S : S extends `${infer S}${From}${infer E}` ? `${S}${To}${ReplaceAll<E, From, To>}` : S;
    export type ToNumber<S extends string> = S extends `${infer N extends number}` ? N : never;
}
declare module "union" {
    export type ToIntersection<U> = (U extends U ? (a: U) => 0 : never) extends (a: infer I) => 0 ? I : never;
    export type LastUnion<U> = ToIntersection<U extends U ? (a: U) => 0 : never> extends (a: infer L) => 0 ? L : never;
    export type IsUnion<T, B extends T = T> = (T extends T ? (B extends T ? true : unknown) : never) extends true ? false : true;
    type _UnionToTuple<U, Last = LastUnion<U>> = [U] extends [never] ? [] : [..._UnionToTuple<Exclude<U, Last>>, Last];
    export type ToTuple<U> = _UnionToTuple<Exclude<U, never>>;
}
declare module "utils" {
    export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;
    export type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true;
    export type IsAny<T> = 0 extends 1 & T ? true : false;
    export type NotAny<T> = true extends IsAny<T> ? false : true;
    export type OneOf<T extends boolean[]> = T extends [
        infer A,
        ...infer B extends boolean[]
    ] ? A extends true ? true : OneOf<B> : false;
    export type NoneOf<T extends boolean[]> = T extends [
        infer A,
        ...infer B extends boolean[]
    ] ? A extends true ? false : NoneOf<B> : true;
}
declare module "tuple" {
    import { IsUnion, ToTuple } from "union";
    import { Equal } from "utils";
    export type Includes<T extends readonly any[], U> = T extends readonly [
        infer First,
        ...infer Rest
    ] ? Equal<First, U> extends true ? true : Includes<Rest, U> : false;
    type _Merge<T extends any[], K extends any[]> = K extends [infer A, ...infer B] ? Includes<T, A> extends true ? _Merge<T, B> : _Merge<[...T, A], B> : T;
    export type Merge<T extends any[][], R extends any[] = []> = T extends [
        infer A extends any[],
        ...infer B extends any[][]
    ] ? Merge<B, _Merge<R, A>> : R;
    export type IncludesAll<T extends any[][], V> = T extends [
        infer A extends any[],
        ...infer R extends any[][]
    ] ? Includes<A, V> extends false ? false : IncludesAll<R, V> : true;
    type _JoinArray<T extends any[], E extends any[][], K extends any[] = []> = T extends [infer V, ...infer R extends any[]] ? IncludesAll<E, V> extends true ? _JoinArray<R, E, [...K, V]> : _JoinArray<R, E, K> : K;
    export type Join<T extends any[]> = IsUnion<T> extends false ? T : ToTuple<T> extends infer TT extends any[][] ? Merge<TT> extends infer All extends any[] ? _JoinArray<All, TT> : never : never;
    export type IsSubArray<T extends any[], K extends readonly any[]> = T extends [
        ...K,
        ...infer _R
    ] ? true : T["length"] extends K["length"] ? false : T extends [infer _A, ...infer R] ? IsSubArray<R, K> : false;
    export type Push<T extends any[], V> = [...T, V];
    /**
     * Get first item.
     */
    export type First<T, Default = never> = T extends [infer F, ...infer _R] ? F : Default;
    /**
     * Get last item.
     */
    export type Last<T, Default = never> = T extends [...infer _F, infer L] ? L : Default;
}
