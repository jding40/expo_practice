// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const onPressLearnMore = () => {
    console.log("learn more!!");
  };
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app! Coca</Text>
      <Text
        style={{
          margin: 16,
          borderWidth: 2,
          borderColor: "#ff0000",
          color: "#ff0000",
          padding: 4,
        }}
      >
        Coca
      </Text>
      <TextInput>Full Name: </TextInput>
      <Button title="Submit" />
      {/* <StatusBar style="auto" /> */}
      <Text style={styles.diyText}>DIY Text!!!</Text>
      <Button
        onPress={onPressLearnMore}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
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
