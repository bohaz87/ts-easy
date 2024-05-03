import { IsAny, Equal } from "../src/utils";
import { Expect, ExpectFalse, IsFalse, IsTrue } from "./test-util";

describe("utils", () => {
  test("equal", () => {
    type test_equal = [
      Expect<Equal<any, any>>,
      Expect<Equal<never, never>>,
      Expect<Equal<1, 1>>,
      Expect<Equal<1 | [2], 1 | [2]>>,
      Expect<Equal<[never, undefined, null], [never, undefined, null]>>,
      Expect<Equal<string, string | "a">>,
      Expect<Equal<{ a: {} } & { b: [] }, { b: [] } & { a: {} }>>,

      ExpectFalse<Equal<any, 1>>,
      ExpectFalse<Equal<any, unknown>>
    ];
  });

  test("isany", () => {
    type test_isany = [
      Expect<IsAny<any>>,
      Expect<IsAny<1 | {} | [] | any>>,

      ExpectFalse<IsAny<never>>,
      ExpectFalse<IsAny<1>>,
      ExpectFalse<IsAny<string>>,
      ExpectFalse<IsAny<{}>>,
      ExpectFalse<IsAny<unknown>>,
      ExpectFalse<IsAny<null>>,
      ExpectFalse<IsAny<undefined>>,
      ExpectFalse<IsAny<1 | {} | []>>
    ];
  });
});
