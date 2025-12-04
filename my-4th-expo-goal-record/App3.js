// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const onPressLearnMore = () => {
    console.log("learn more!!");
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flexDirection: "row" }}>
        <View style={{ height: 100, backgroundColor: "blue", flex: 4.8 }} />
        <View style={{ height: 100, backgroundColor: "red", flex: 1.6 }} />
        <Text>Hello World! in SafeAreaProvider </Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
  },
  diyText: {
    color: "#00ff00",
    fontSize: 36,
  },
});
