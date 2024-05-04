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
