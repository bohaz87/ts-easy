declare module "union" {
    export namespace Union {
        export type ToIntersection<U> = (U extends U ? (a: U) => 0 : never) extends (a: infer I) => 0 ? I : never;
        export type LastUnion<U> = ToIntersection<U extends U ? (a: U) => 0 : never> extends (a: infer L) => 0 ? L : never;
        export type IsUnion<T, B extends T = T> = (T extends T ? (B extends T ? true : unknown) : never) extends true ? false : true;
        type _UnionToTuple<U, Last = LastUnion<U>> = [U] extends [never] ? [] : [..._UnionToTuple<Exclude<U, Last>>, Last];
        export type ToTuple<U> = _UnionToTuple<Exclude<U, never>>;
        export {};
    }
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
    import { Union } from "union";
    import { Equal } from "utils";
    export namespace Tuple {
        export type Includes<T extends readonly any[], U> = T extends readonly [
            infer First,
            ...infer Rest
        ] ? Equal<First, U> extends true ? true : Includes<Rest, U> : false;
        type _Merge<T extends any[], K extends any[]> = K extends [
            infer A,
            ...infer B
        ] ? Includes<T, A> extends true ? _Merge<T, B> : _Merge<[...T, A], B> : T;
        export type Merge<T extends any[][], R extends any[] = []> = T extends [
            infer A extends any[],
            ...infer B extends any[][]
        ] ? Merge<B, _Merge<R, A>> : R;
        export type IncludesAll<T extends any[][], V> = T extends [
            infer A extends any[],
            ...infer R extends any[][]
        ] ? Includes<A, V> extends false ? false : IncludesAll<R, V> : true;
        type _JoinArray<T extends any[], E extends any[][], K extends any[] = []> = T extends [infer V, ...infer R extends any[]] ? IncludesAll<E, V> extends true ? _JoinArray<R, E, [...K, V]> : _JoinArray<R, E, K> : K;
        export type Join<T extends any[]> = Union.IsUnion<T> extends false ? T : Union.ToTuple<T> extends infer TT extends any[][] ? Merge<TT> extends infer All extends any[] ? _JoinArray<All, TT> : never : never;
        export type IsSubArray<T extends any[], K extends readonly any[]> = T extends [...K, ...infer _R] ? true : T["length"] extends K["length"] ? false : T extends [infer _A, ...infer R] ? IsSubArray<R, K> : false;
        type _RepeatString<S extends string, N extends number, C extends number[] = [], R extends string = ""> = C["length"] extends N ? R : _RepeatString<S, N, Push<C, 0>, `${R}${S}`>;
        export type RepeatString<S extends string, N extends number> = S extends "" ? S : _RepeatString<S, N>;
        export type Push<T extends any[], V> = [...T, V];
        /**
         * Get first string character or first array item.
         */
        export type First<T, Default = never> = T extends string ? T extends `${infer F}${infer _R}` ? F : Default : T extends any[] ? T extends [infer F, ...infer _R] ? F : Default : never;
        /**
         * Get last string character or last array item.
         */
        export type Last<T, Default = never> = T extends string ? T extends `${infer A}${infer L}` ? L extends "" ? A : Last<L, Default> : Default : T extends any[] ? T extends [...infer _F, infer L] ? L : Default : never;
        export {};
    }
}
