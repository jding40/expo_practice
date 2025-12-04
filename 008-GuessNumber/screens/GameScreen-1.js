// GameScreen version 1：自写版本
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import Title from "../components/ui/Title.js";
import NumberContainer from "../components/game/NumberContainer.js";
import Colors from "../constants/colors.js";
import PrimaryButton from "../components/ui/PrimaryButton.js";
import Number from "../constants/number.js";
import GameOverScreen from "./GameOverScreen.js";

export default function GameScreen({ userNum }) {
  const insets = useSafeAreaInsets();
  const [low, setLow] = useState(Number.low);
  const [high, setHigh] = useState(Number.high);
  console.log("userNum at the beginning: ", userNum);

  function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
      return generateRandomBetween(min, max, exclude);
    } else {
      return rndNum;
    }
  }
  const initialGuess = generateRandomBetween(Number.low, Number.high, userNum);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  function nextGuessHandler(isHigher) {
    if (isHigher) {
      if (userNum > currentGuess) {
        console.log("The number is higher");
        setLow(currentGuess + 1);
      } else {
        Alert.alert("You can't cheat me!");
      }
    } else {
      if (userNum < currentGuess) {
        setHigh(currentGuess - 1);
        console.log("The number is lower");
      } else {
        Alert.alert("You can't cheat me!");
      }
    }
  }
  useEffect(() => {
    setCurrentGuess(generateRandomBetween(low, high + 1, 0));
  }, [low, high]);

  const styles = StyleSheet.create({
    container: {
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: 30,
      paddingRight: 30,
    },
    textContainer: {
      borderWidth: 4,
      borderColor: Colors.accent500,
      padding: 24,
      margin: 24,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
    },
    text: {
      // height: 50,
      // borderWidth: 2,
      // borderRadius: 8,
      color: Colors.accent500,
      fontSize: 20,
      fontWeight: "bold",
    },
    buttonsContainer: {
      flexDirection: "row",
      marginVertical: 16,
    },
  });

  if (currentGuess === userNum) {
    console.log("You got it!");
    return <GameOverScreen />;
  } else {
    console.log("currentGuess is ", currentGuess);
    console.log("userNum is ", userNum);
  }

  return (
    <View style={styles.container}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>
        {/* <Text>test</Text> */}
        {currentGuess}
      </NumberContainer>
      {/* <NumberContainer children={currentGuess} /> */}
      {/* <Text>Guess</Text> */}
      <View style={styles.textContainer}>
        <Text style={styles.text}>Higher or lower</Text>
        <View style={styles.buttonsContainer}>
          <PrimaryButton pressHandler={nextGuessHandler.bind(this, true)}>
            +
          </PrimaryButton>
          <PrimaryButton pressHandler={nextGuessHandler.bind(this, false)}>
            -
          </PrimaryButton>
        </View>
      </View>
      <Text>+ -</Text>
      <View>
        <Text>Log our rounds</Text>
      </View>
    </View>
  );
}
