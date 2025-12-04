// GameScreen version 4 用useState代替版本3中的useRef
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  FlatList,
} from "react-native";
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

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max + 1 - min)) + min;
  console.log("exclude is: ", exclude);
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

export default function GameScreen({
  userNum,
  setGameStatus,
  setRoundsNumbers,
  roundsNumbers,
}) {
  const insets = useSafeAreaInsets();

  // → 最佳实践：使用 useRef 保存 low/high
  const lowRef = useRef(Number.low);
  const highRef = useRef(Number.high);
  // const [lowRef, setLowRef] = useState({ current: Number.low });
  // const [highRef, setHighRef] = useState({ current: Number.high });

  // 初始猜测
  const initialGuess = generateRandomBetween(
    // lowRef.current,
    Number.low,
    // highRef.current,
    Number.high,
    userNum
  );

  // console.log("initialGuess is: ", initialGuess);
  //const [currentGuess, setCurrentGuess] = useState(initialGuess);

  const [currentGuess, setCurrentGuess] = useState(() => {
    console.log("set a initial guess");
    return generateRandomBetween(Number.low, Number.high, userNum);
  });

  function nextGuessHandler(isHigher) {
    if (isHigher) {
      if (userNum <= currentGuess) {
        Alert.alert("Don't cheat!");
        return;
      }
      // 提升下界
      lowRef.current = currentGuess + 1;
      console.log("lowRef.current is: ", lowRef.current);

      console.log("11111111111");
    } else {
      if (userNum >= currentGuess) {
        Alert.alert("Don't cheat!");
        return;
      }
      // 降低上界
      highRef.current = currentGuess - 1;
      console.log("highRef.current is: ", highRef.current);

      console.log("222222222");
    }

    const newGuess = generateRandomBetween(lowRef.current, highRef.current);
    setRoundsNumbers((preNumbers) => [newGuess, ...preNumbers]);
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

  // 无限渲染
  // useEffect(() => {
  //   if (initialGuess) setRoundsNumbers([initialGuess]);
  // }, [initialGuess]);

  //将第一轮初始化时的值也加进去
  useEffect(() => {
    setRoundsNumbers([currentGuess]);
  }, []);

  const styles = StyleSheet.create({
    container: {
      paddingTop: insets.top + 20,
      paddingBottom: insets.bottom,
      paddingLeft: 30,
      paddingRight: 30,
      flex: 1,
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
    flatList: {
      flex: 1,
      // borderWidth: 1,
      padding: 12,
    },
    guessUnit: {
      //backgroundColor: "white",
      padding: 12,
    },
    guessUnitText: {
      fontSize: 24,
      fontFamily: "OpenSans",
    },
    highlightText: {
      color: "blue",
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

      <Text>Log our rounds:{roundsNumbers.join("-")}</Text>
      <FlatList
        data={roundsNumbers}
        style={styles.flatList}
        renderItem={(itemData) => {
          return (
            <View style={styles.guessUnit}>
              <Text style={styles.guessUnitText}>
                第
                <Text style={styles.highlightText}>
                  {roundsNumbers.length - itemData.index}
                </Text>
                次尝试，尝试数值
                <Text style={styles.highlightText}>{itemData.item}</Text>
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}
