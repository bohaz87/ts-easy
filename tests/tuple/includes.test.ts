import { Equal } from "../../src/utils";
import { Expect } from "../test-util";
import { Tuple } from "tuple";

describe("tuple.includes", () => {
  function includes<T extends number[], V extends number>(arr: T, v: V) {
    return arr.includes(v) as Tuple.Includes<T, V>;
  }

  const a = includes([1, 2, 3] as const, 1);

  test("it", () => {
    type cases = [Expect<Equal<typeof a, true>>];
  });
});
