/**
 * Get first character
 */
export type First<
  S extends string,
  Default = never
> = S extends `${infer F}${infer _R}` ? F : Default;

/**
 * Get last character
 */
export type Last<
  S extends string,
  Default = never
> = S extends `${infer H}${infer L}`
  ? L extends ""
    ? H
    : Last<L, Default>
  : Default;

type _RepeatString<
  S extends string,
  N extends number,
  C extends number[] = [],
  R extends string = ""
> = C["length"] extends N ? R : _RepeatString<S, N, [...C, 0], `${R}${S}`>;
/**
 * Repeat a string N times
 */
export type Repeat<S extends string, N extends number> = S extends ""
  ? S
  : _RepeatString<S, N>;

export type Trim<
  S extends string,
  Space extends string = " " | "\n" | "\t"
> = S extends `${Space}${infer R}` | `${infer R}${Space}` ? Trim<R> : S;

export type Replace<
  S extends string,
  From extends string,
  To extends string
> = From extends ""
  ? S
  : S extends `${infer start}${From}${infer end}`
  ? `${start}${To}${end}`
  : S;

export type ReplaceAll<
  S extends string,
  From extends string,
  To extends string
> = From extends ""
  ? S
  : S extends `${infer S}${From}${infer E}`
  ? `${S}${To}${ReplaceAll<E, From, To>}`
  : S;

export type ToNumber<S extends string> = S extends `${infer N extends number}`
  ? N
  : never;
