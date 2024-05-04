# Typescript Easy

```javascript
import { Repeat } from "ts-easy/string";

function includes<T extends number[], V extends number>(arr: T, v: V) {
  return arr.includes(v) as Includes<T, V>;
}

const a = includes([1, 2, 3] as const, 1);
```
