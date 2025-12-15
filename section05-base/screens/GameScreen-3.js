// GameScreen version 3 ChatGPT写的最佳实践版本 使用useRef
import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState, useRef } from "react";
import Title from "../components/ui/Title.js";
import NumberContainer from "../components/game/NumberContainer.js";
import Colors from "../constants/colors.js";
import PrimaryButton from "../components/ui/PrimaryButton.js";
import Number from "../constants/number.js";
import GameOverScreen from "./GameOverScreen.js";

export default function GameScreen({ userNum }) {
  const insets = useSafeAreaInsets();

  // → 最佳实践：使用 useRef 保存 low/high
  const lowRef = useRef(Number.low);
  const highRef = useRef(Number.high);

  function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
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
    } else {
      if (userNum >= currentGuess) {
        Alert.alert("Don't cheat!");
        return;
      }
      // 降低上界
      highRef.current = currentGuess;
    }

    const newGuess = generateRandomBetween(
      lowRef.current,
      highRef.current,
      currentGuess
    );

    setCurrentGuess(newGuess);
  }

  // 游戏结束判断
  if (currentGuess === userNum) {
    return <GameOverScreen />;
  }

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

      <View>
        <Text>Log our rounds</Text>
      </View>
    </View>
  );
}
