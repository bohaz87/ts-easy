import { Equal } from "../src/utils";
import { String as Str } from "../src/string";
import { Expect } from "./test-util";

type test_first = [
  Expect<Equal<Str.First<"">, never>>,
  Expect<Equal<Str.First<"", "">, "">>,
  Expect<Equal<Str.First<"", undefined>, undefined>>,
  Expect<Equal<Str.First<"a">, "a">>,
  Expect<Equal<Str.First<"abc">, "a">>,
  Expect<Equal<Str.First<any>, never>>,
  Expect<Equal<Str.First<never>, never>>,
  Expect<Equal<Str.First<"ab" | "cd">, "a" | "c">>,
  // @ts-expect-error should be string
  Expect<Equal<Str.First<unknown>, never>>,
  // @ts-expect-error should be string
  Expect<Equal<Str.First<["a"]>, never>>,
  // @ts-expect-error should be string
  Expect<Equal<Str.First<"ab" | "cd" | any>, "a" | "c">>
];
type test_last = [
  Expect<Equal<Str.Last<"">, never>>,
  Expect<Equal<Str.Last<"", "">, "">>,
  Expect<Equal<Str.Last<"", undefined>, undefined>>,
  Expect<Equal<Str.Last<"a">, "a">>,
  Expect<Equal<Str.Last<"abc">, "c">>,
  Expect<Equal<Str.Last<any>, never>>,
  Expect<Equal<Str.Last<never>, never>>,
  Expect<Equal<Str.Last<"ab" | "cd">, "b" | "d">>,
  // @ts-expect-error should be string
  Expect<Equal<Str.Last<unknown>, never>>,
  // @ts-expect-error should be string
  Expect<Equal<Str.Last<["a"]>, never>>,
  // @ts-expect-error any is not string
  Expect<Equal<Str.Last<"ab" | "cd" | any>, "a" | "c">>
];
type test_repeat = [
  Expect<Equal<Str.Repeat<"", 3>, "">>,
  Expect<Equal<Str.Repeat<"a", 0>, "">>,
  Expect<Equal<Str.Repeat<"a", 3>, "aaa">>,
  Expect<Equal<Str.Repeat<"abc", 3>, "abcabcabc">>,
  Expect<Equal<Str.Repeat<"a" | "b", 3>, "aaa" | "bbb">>,
  Expect<Equal<Str.Repeat<never, 3>, never>>,
  // @ts-expect-error any is not string
  Expect<Equal<Str.Repeat<any, 3>, never>>,
  // @ts-expect-error unknown not string
  Expect<Equal<Str.Repeat<unknown, 3>, never>>,
  // @ts-expect-error array is not string
  Expect<Equal<Str.Repeat<["a"], 3>, never>>
];

type trim_cases = [
  Expect<Equal<Str.Trim<"str">, "str">>,
  Expect<Equal<Str.Trim<" str">, "str">>,
  Expect<Equal<Str.Trim<"     str">, "str">>,
  Expect<Equal<Str.Trim<"str   ">, "str">>,
  Expect<Equal<Str.Trim<"     str     ">, "str">>,
  Expect<Equal<Str.Trim<"   \n\t foo bar \t">, "foo bar">>,
  Expect<Equal<Str.Trim<"">, "">>,
  Expect<Equal<Str.Trim<" \n\t ">, "">>
];

type replace_cases = [
  Expect<Equal<Str.Replace<"foobar", "bar", "foo">, "foofoo">>,
  Expect<Equal<Str.Replace<"foobarbar", "bar", "foo">, "foofoobar">>,
  Expect<Equal<Str.Replace<"foobarbar", "", "foo">, "foobarbar">>,
  Expect<Equal<Str.Replace<"foobarbar", "bar", "">, "foobar">>,
  Expect<Equal<Str.Replace<"foobarbar", "bra", "foo">, "foobarbar">>,
  Expect<Equal<Str.Replace<"", "", "">, "">>
];

type ReplaceAll<
  S extends string,
  F extends string,
  T extends string
> = Str.ReplaceAll<S, F, T>;
type replaceall_cases = [
  Expect<Equal<ReplaceAll<"foobar", "bar", "foo">, "foofoo">>,
  Expect<Equal<ReplaceAll<"foobar", "bag", "foo">, "foobar">>,
  Expect<Equal<ReplaceAll<"foobarbar", "bar", "foo">, "foofoofoo">>,
  Expect<Equal<ReplaceAll<"t y p e s", " ", "">, "types">>,
  Expect<Equal<ReplaceAll<"foobarbar", "", "foo">, "foobarbar">>,
  Expect<Equal<ReplaceAll<"barfoo", "bar", "foo">, "foofoo">>,
  Expect<Equal<ReplaceAll<"foobarfoobar", "ob", "b">, "fobarfobar">>,
  Expect<Equal<ReplaceAll<"foboorfoboar", "bo", "b">, "foborfobar">>,
  Expect<Equal<ReplaceAll<"", "", "">, "">>
];

type tonumber_cases = [
  Expect<Equal<Str.ToNumber<"">, never>>,
  Expect<Equal<Str.ToNumber<"0">, 0>>,
  Expect<Equal<Str.ToNumber<"5">, 5>>,
  Expect<Equal<Str.ToNumber<"12">, 12>>,
  Expect<Equal<Str.ToNumber<"27">, 27>>,
  Expect<Equal<Str.ToNumber<"18@7_$%">, never>>,
  Expect<Equal<Str.ToNumber<"123456789">, 123456789>>
];
