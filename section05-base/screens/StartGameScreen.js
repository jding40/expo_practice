import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import Colors from "../constants/colors";
import { useState } from "react";
import PrimaryButton from "../components/ui/PrimaryButton.js";
import Warning from "../components/Warning.js";
import { LinearGradient } from "expo-linear-gradient";
import Title from "../components/ui/Title.js";

export default function StartGameScreen({ setUserNum, setGameStatus }) {
  const [correctNum, setCorrectNum] = useState("0");
  const [warningIsVisible, setWarningIsVisible] = useState(false);

  function resetNum() {
    setCorrectNum("0");
  }

  function confirmHandler() {
    console.log("beginning of conform handler");
    if (!/^\d{1,2}$/.test(correctNum)) {
      console.log("Illegal input!");
      Alert.alert("Illegal input!", "number should be a 2-digit number", [
        {
          text: "Okay",
          style: "destructive",
          onPress: setCorrectNum.bind(this, ""),
        },
      ]);
      return;
    } else {
      const num = parseInt(correctNum);
      if (num < 20 || num > 80) {
        console.log("number should be between 20 and 80");
        Alert.alert("Invalid number!", "number should be between 20 and 80", [
          {
            text: "Okay",
            style: "destructive",
            onPress: setCorrectNum.bind(this, ""),
          },
        ]);

        // const answer = Alert.prompt("Are you OK?");
        // console.log(answer);
        return;
      }
      setUserNum(+correctNum);
      setGameStatus(true);
      return;
    }

    // if (correctNum > 100 || correctNum < 1) setWarningIsVisible(true);
    // else {
    //   //TBC
    // }
  }

  return (
    <View style={styles.screen}>
      <Title style={styles.title}>Guess My Number</Title>

      <View style={styles.inputContainer}>
        <Text style={styles.prompt}>Enter a Number</Text>
        <TextInput
          style={styles.numInput}
          placeholder="Input an number"
          onChangeText={(numString) => setCorrectNum(numString)}
          value={correctNum}
          maxLength={2}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text>Current Correct Number is {correctNum}</Text>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.buttonStyle}
            onPress={setCorrectNum.bind(this, "")}
          >
            <Text style={styles.buttonText}>Reset</Text>
          </Pressable>
          <Pressable onPress={confirmHandler} style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Confirm</Text>
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton pressHandler={setCorrectNum.bind(this, "")}>
            Reset
          </PrimaryButton>
          <PrimaryButton style={styles.buttonStyle}>Confirm</PrimaryButton>
        </View>
      </View>
      <Warning
        warningIsVisible={warningIsVisible}
        setWarningIsVisible={setWarningIsVisible}
      />
      <StatusBar style="auto" />
      <PrimaryButton style={{ width: 150 }}>Test Button</PrimaryButton>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    //backgroundColor: "#8a2be2",
    alignItems: "center", // 交叉轴cross axis上的对齐方式, 默认值为stretch,
    justifyContent: "center", //主轴main axis上的对齐方式
    alignContent: "center",
    gap: 20,
  },
  title: {
    borderWidth: 2,
    borderColor: "#ffffff",
    // alignContent: "center",
    // alignSelf: "center",
    // textAlign: "center",
    padding: 16,
    color: "#ffffff",
    fontSize: 24,
    marginVertical: 24,
  },
  textInput: {
    marginVertical: 32,
    height: 60,
    width: 80,
    fontSize: 32,
    textAlign: "center",
    color: "white",
    borderBottomWidth: 2,
    borderBottomColor: "white",
  },
  numInput: {
    height: 50,
    width: 60,
    fontSize: 28,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    marginVertical: 8,
    textAlign: "center",
  },
  inputContainer: {
    backgroundColor: "#8b0000",
    padding: 20,
    borderRadius: 12,
    width: "80%",
    // justifyContent: "center",
    alignItems: "center",
    // justifySelf: "center",

    // iOS 阴影
    shadowColor: "#ffffff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 8,

    // Android 阴影
    elevation: 5,
  },

  prompt: {
    color: "#00ffff",
    //color: Colors.accent500,
    textAlign: "center",
    // justifySelf: "center",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 12,
  },

  buttonStyle: {
    marginHorizontal: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#470d0dff",
    borderRadius: 12,

    // iOS 阴影
    shadowColor: "#ffffff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,

    // Android 阴影
    elevation: 5,
  },

  buttonText: {
    fontSize: 20,
    color: "white",
  },
});
