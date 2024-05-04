import {
  First,
  Last,
  Repeat,
  Replace,
  ReplaceAll,
  ToNumber,
  Trim,
} from "../src/string";
import { Equal } from "../src/utils";
import { Expect } from "./test-util";

type test_first = [
  Expect<Equal<First<"">, never>>,
  Expect<Equal<First<"", "">, "">>,
  Expect<Equal<First<"", undefined>, undefined>>,
  Expect<Equal<First<"a">, "a">>,
  Expect<Equal<First<"abc">, "a">>,
  Expect<Equal<First<any>, never>>,
  Expect<Equal<First<never>, never>>,
  Expect<Equal<First<"ab" | "cd">, "a" | "c">>,
  // @ts-expect-error should be string
  Expect<Equal<First<unknown>, never>>,
  // @ts-expect-error should be string
  Expect<Equal<First<["a"]>, never>>,
  // @ts-expect-error should be string
  Expect<Equal<First<"ab" | "cd" | any>, "a" | "c">>
];
type test_last = [
  Expect<Equal<Last<"">, never>>,
  Expect<Equal<Last<"", "">, "">>,
  Expect<Equal<Last<"", undefined>, undefined>>,
  Expect<Equal<Last<"a">, "a">>,
  Expect<Equal<Last<"abc">, "c">>,
  Expect<Equal<Last<any>, never>>,
  Expect<Equal<Last<never>, never>>,
  Expect<Equal<Last<"ab" | "cd">, "b" | "d">>,
  // @ts-expect-error should be string
  Expect<Equal<Last<unknown>, never>>,
  // @ts-expect-error should be string
  Expect<Equal<Last<["a"]>, never>>,
  // @ts-expect-error any is not string
  Expect<Equal<Last<"ab" | "cd" | any>, "a" | "c">>
];
type test_repeat = [
  Expect<Equal<Repeat<"", 3>, "">>,
  Expect<Equal<Repeat<"a", 0>, "">>,
  Expect<Equal<Repeat<"a", 3>, "aaa">>,
  Expect<Equal<Repeat<"abc", 3>, "abcabcabc">>,
  Expect<Equal<Repeat<"a" | "b", 3>, "aaa" | "bbb">>,
  Expect<Equal<Repeat<never, 3>, never>>,
  // @ts-expect-error any is not string
  Expect<Equal<Repeat<any, 3>, never>>,
  // @ts-expect-error unknown not string
  Expect<Equal<Repeat<unknown, 3>, never>>,
  // @ts-expect-error array is not string
  Expect<Equal<Repeat<["a"], 3>, never>>
];

type trim_cases = [
  Expect<Equal<Trim<"str">, "str">>,
  Expect<Equal<Trim<" str">, "str">>,
  Expect<Equal<Trim<"     str">, "str">>,
  Expect<Equal<Trim<"str   ">, "str">>,
  Expect<Equal<Trim<"     str     ">, "str">>,
  Expect<Equal<Trim<"   \n\t foo bar \t">, "foo bar">>,
  Expect<Equal<Trim<"">, "">>,
  Expect<Equal<Trim<" \n\t ">, "">>
];

type replace_cases = [
  Expect<Equal<Replace<"foobar", "bar", "foo">, "foofoo">>,
  Expect<Equal<Replace<"foobarbar", "bar", "foo">, "foofoobar">>,
  Expect<Equal<Replace<"foobarbar", "", "foo">, "foobarbar">>,
  Expect<Equal<Replace<"foobarbar", "bar", "">, "foobar">>,
  Expect<Equal<Replace<"foobarbar", "bra", "foo">, "foobarbar">>,
  Expect<Equal<Replace<"", "", "">, "">>
];

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
  Expect<Equal<ToNumber<"">, never>>,
  Expect<Equal<ToNumber<"0">, 0>>,
  Expect<Equal<ToNumber<"5">, 5>>,
  Expect<Equal<ToNumber<"12">, 12>>,
  Expect<Equal<ToNumber<"27">, 27>>,
  Expect<Equal<ToNumber<"18@7_$%">, never>>,
  Expect<Equal<ToNumber<"123456789">, 123456789>>
];
