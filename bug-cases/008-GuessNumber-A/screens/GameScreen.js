// GameScreen version 4 用useState代替版本3中的useRef
import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useRef, useEffect } from "react";
import Title from "../components/ui/Title.js";
import NumberContainer from "../components/game/NumberContainer.js";
import Colors from "../constants/colors.js";
import PrimaryButton from "../components/ui/PrimaryButton.js";
import Number from "../constants/number.js";
import GameOverScreen from "./GameOverScreen.js";
import { Ionicons } from "@expo/vector-icons";
//import Ionicons from "@expo/vector-icons/Ionicons";
//import AntDesign from "@expo/vector-icons/AntDesign";

import { AntDesign } from "@expo/vector-icons";

export default function GameScreen({
  userNum,
  setGameStatus,
  setRoundsNumber,
  roundsNumber,
}) {
  const insets = useSafeAreaInsets();

  // → 最佳实践：使用 useRef 保存 low/high
  const lowRef = useRef(Number.low);
  const highRef = useRef(Number.high);
  // const [lowRef, setLowRef] = useState({ current: Number.low });
  // const [highRef, setHighRef] = useState({ current: Number.high });

  function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max + 1 - min)) + min;
    console.log("exclude is: ", exclude);
    if (rndNum === exclude) {
      return generateRandomBetween(min, max, exclude);
    } else {
      return rndNum;
    }
  }

  // 初始猜测
  const initialGuess = generateRandomBetween(
    lowRef.current,
    highRef.current,
    userNum
  );
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  function nextGuessHandler(isHigher) {
    if (isHigher) {
      if (userNum <= currentGuess) {
        Alert.alert("Don't cheat!");
        return;
      }
      // 提升下界
      lowRef.current = currentGuess + 1;
      console.log("lowRef.current is: ", lowRef.current);
      setRoundsNumber((value) => value + 1);
      console.log("11111111111");
    } else {
      if (userNum >= currentGuess) {
        Alert.alert("Don't cheat!");
        return;
      }
      // 降低上界
      highRef.current = currentGuess - 1;
      console.log("highRef.current is: ", highRef.current);
      setRoundsNumber((value) => value + 1);
      console.log("222222222");
    }

    const newGuess = generateRandomBetween(lowRef.current, highRef.current);
    console.log("newGuess is: ", newGuess);
    console.log("3333333");

    setCurrentGuess(newGuess);
  }

  // 游戏结束判断
  // if (currentGuess === userNum) {
  //   setGameStatus(false);
  //   // return <GameOverScreen />;
  //   return;
  // }

  useEffect(() => {
    console.log(currentGuess, " VS ", userNum);
    if (currentGuess === userNum) {
      setGameStatus(false);
      return;
    }
  }, [currentGuess, userNum]);

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
      color: Colors.accent500,
      fontSize: 20,
      fontWeight: "bold",
    },
    buttonsContainer: {
      flexDirection: "row",
      marginVertical: 16,
    },
  });

  return (
    <View style={styles.container}>
      <Title>Opponent's Guess</Title>

      <NumberContainer>{currentGuess}</NumberContainer>

      <Ionicons name="add-outline" size={32} color="green" />

      <Ionicons name="checkmark-circle" size={32} color="green" />
      <Ionicons name="battery-full-outline" size={32} color="green" />
      {/* <Ionicons name="md-remove" size={32} color="green" /> */}
      <AntDesign name="alibaba" size={80} color="green" />
      <View style={styles.textContainer}>
        <Text style={styles.text}>Higher or Lower</Text>

        <View style={styles.buttonsContainer}>
          <PrimaryButton pressHandler={nextGuessHandler.bind(this, true)}>
            +
          </PrimaryButton>
          <PrimaryButton pressHandler={nextGuessHandler.bind(this, false)}>
            -
          </PrimaryButton>
        </View>
      </View>

      <View>
        <Text>Log our rounds:{roundsNumber}</Text>
      </View>
    </View>
  );
}
