import { Equal } from "./../src/utils";
import { Tuple } from "../src/tuple";
import { Expect, ExpectFalse } from "./test-util";

describe("tuple", () => {
  test("includes", () => {
    type test_includes = [
      Expect<Tuple.Includes<[any], any>>,
      Expect<Tuple.Includes<[never], never>>,
      Expect<Tuple.Includes<[never, 1], 1>>,
      Expect<Tuple.Includes<[1, 2, 3], 1>>,

      ExpectFalse<Tuple.Includes<[never, 1], 2>>
    ];
  });

  test("merge", () => {
    type test_merge = [
      Expect<Equal<Tuple.Merge<[[any, 1], [2, never]]>, [any, 1, 2, never]>>,
      Expect<
        Equal<
          Tuple.Merge<
            [[any, 1], [1, never], [unknown, any, null], [undefined]]
          >,
          [any, 1, never, unknown, null, undefined]
        >
      >
    ];
  });

  test("join", () => {
    type test_join = [
      Expect<Equal<Tuple.Join<[1, 2] | [2, 3]>, [2]>>,
      Expect<Equal<Tuple.Join<[1, 2] | [1, 3]>, [1]>>,
      Expect<Equal<Tuple.Join<[1, 2] | [3, 4]>, []>>,
      Expect<Equal<Tuple.Join<[] | []>, []>>,
      Expect<Equal<Tuple.Join<[1, 2, 3] | [2, 3, 4] | [3, 4, 5]>, [3]>>,
      Expect<
        Equal<
          Tuple.Join<
            | [{}, null, undefined, any, unknown, never, boolean, "1"]
            | [never, unknown, any, undefined, null, {}, false, true, string]
          >,
          [{}, null, undefined, any, unknown, never]
        >
      >,
      Expect<
        Equal<Tuple.Join<[[1, 2, 3] | [2, 3, 4] | [3, 4, 5]][number]>, [3]>
      >
    ];
  });
});
