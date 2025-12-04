import { StatusBar } from "expo-status-bar";
import Title from "./components/ui/Title.js";
import StartGameScreen from "./screens/StartGameScreen.js";
import GameScreen from "./screens/GameScreen.js";
import GameOverScreen from "./screens/GameOverScreen.js";
import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
// import { useFonts } from "expo-font";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  ImageBackground,
} from "react-native";
import Colors from "./constants/colors.js";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function App() {
  const [correctNum, setCorrectNum] = useState("0");
  const [warningIsVisible, setWarningIsVisible] = useState(false);
  const [userNum, setUserNum] = useState(null);
  const [gameStatus, setGameStatus] = useState(false);
  const [roundsNumber, setRoundsNumber] = useState(0);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      await Font.loadAsync({
        "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
        "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
      });

      setReady(true);
      await SplashScreen.hideAsync();
    }

    prepare();
  }, []);

  if (!ready) return null;

  let screen = (
    <StartGameScreen setUserNum={setUserNum} setGameStatus={setGameStatus} />
  );

  if (userNum !== null && gameStatus) {
    screen = (
      <GameScreen
        userNum={userNum}
        setGameStatus={setGameStatus}
        setRoundsNumber={setRoundsNumber}
        roundsNumber={roundsNumber}
      />
    );
  }
  if (userNum !== null && !gameStatus) {
    console.log("switch to game over screen");
    screen = (
      <GameOverScreen
        roundsNumber={roundsNumber}
        userNum={userNum}
        setUserNum={setUserNum}
      />
    );
  }

  // useFonts({
  //   "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
  //   "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  // });

  return (
    <SafeAreaProvider>
      <LinearGradient
        colors={[Colors.primary800, Colors.accent500]}
        style={styles.rootScreen}
      >
        <ImageBackground
          source={require("./assets/images/background.png")}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          {/* <Title>App.jssssssss</Title> */}
          {screen}
        </ImageBackground>
      </LinearGradient>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.3,
  },
});
