import { View, Text, StyleSheet, Dimensions } from "react-native";

import Colors from "../../constants/colors";

function NumberContainer({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
}

export default NumberContainer;

//const deviceWidth = Dimensions.get("screen").width;
const deviceWidth = Dimensions.get("window").width;
console.log("window: ", Dimensions.get("window"));
console.log("screen: ", Dimensions.get("screen"));

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.accent500,
    padding: deviceWidth < 450 ? 12 : 24,
    margin: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    color: Colors.accent500,
    fontSize: 36,
    //fontWeight: "bold",
    fontFamily: "open-sans-bold",
  },
});
