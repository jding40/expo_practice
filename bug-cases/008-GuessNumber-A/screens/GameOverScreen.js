import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import Colors from "../constants/colors.js";
import { SafeAreaView } from "react-native-safe-area-context";
import Title from "../components/ui/Title.js";
function GameOverScreen({ roundsNumber, userNum, setUserNum }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.rootContainer}>
        <Title>Game Over</Title>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/success.png")}
            style={styles.image}
          />
        </View>
        <Text style={styles.summaryText}>
          Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text>{" "}
          rounds to guess the number{" "}
          <Text style={styles.highlight}>{userNum}</Text>.
        </Text>
      </View>
      <Pressable onPress={setUserNum.bind(this, null)}>
        <Text>Restart</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 320,
    height: 320,
    borderRadius: 200,
    borderWidth: 3,
    borderColor: Colors.primary800,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 200, // 必须在 Image 上也写
    resizeMode: "cover", // 避免图像变形
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 24,
  },
  highlight: {
    fontFamily: "open-sans-bold",
    color: Colors.primary500,
  },
});

export default GameOverScreen;
