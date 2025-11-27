import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState("");
  const [courseGoals, setCourseGoals] = useState([]);

  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }

  function addGoalHandler() {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      enteredGoalText,
    ]);
    console.log(courseGoals);
    setEnteredGoalText("");
  }

  return (
    <View style={{ flex: 1, paddingTop: 50, paddingHorizontal: 16 }}>
      <View
        style={{ height: 70, backgroundColor: "yellow", flexDirection: "row" }}
      >
        <TextInput
          style={{ borderWidth: 1, width: "70%" }}
          placeholder="Your course goal!"
          onChangeText={goalInputHandler}
          value={enteredGoalText}
        />
        <Button title="Add Goal" onPress={addGoalHandler} />
      </View>
      <ScrollView
        alwaysBounceVertical={true}
        style={{
          borderWidth: 1,
          backgroundColor: "pink",
        }}
      >
        {courseGoals.map((goal, index) => (
          <View key={index} style={{ marin: 8, padding: 8 }}>
            <Text style={{ color: "white" }}>{goal}</Text>
            <Text style={{ color: "green" }}>Note the color</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// const styles = StyleSheet.create({
//   appContainer: {
//     flex: 1,
//     paddingTop: 50,
//     paddingHorizontal: 16,
//     flexDirection: "column",
//     borderWidth: 10,
//     borderColor: "green",
//   },
//   inputContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginVertical: 20,
//     borderWidth: 1,
//     borderBottomColor: "#cccccc",
//   },
//   textInput: {
//     borderWidth: 1,
//     borderColor: "#cccccc",
//     width: "70%",
//     marginRight: 8,
//     padding: 8,
//   },
//   goalsContainer: {
//     flex: 3,
//     borderWidth: 1,
//   },
//   goalItem: {
//     margin: 8,
//     padding: 8,
//     borderRadius: 6,
//     backgroundColor: "#5e0acc",
//     color: "red",
//   },
//   goalText: {
//     color: "white",
//   },
// });
