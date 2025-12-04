## 问题

```js
const initialGuess = generateRandomBetween(
    lowRef.current,
    highRef.current,
    userNum
);
```
- 此处`lowRef.current`和`highRef.current`应该写死，替换为`Number.low`和`Number.high`



