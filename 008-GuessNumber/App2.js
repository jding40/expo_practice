import { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";

export default function App() {
  const [count, setCount] = useState(0);

  async function handlePress() {
    console.log("Before setCount, count =", count);

    await setCount(count + 1);
    // ❗ await 在这里没有任何效果

    console.log("After setCount, count =", count);
    // ❗ 输出的 count 仍然是旧值
  }

  // 正确的方式：监听 count 的变化
  useEffect(() => {
    console.log("count updated to:", count);
  }, [count]);

  return (
    <View style={{ marginVertical: 60 }}>
      <Text style={{ color: "purple", textAlign: "center" }}>
        Count: {count}
      </Text>
      <Button title="Increase" onPress={handlePress} />
    </View>
  );
}
