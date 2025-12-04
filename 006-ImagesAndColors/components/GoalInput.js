import { useState } from "react";
import {
  View,
  Button,
  TextInput,
  Modal,
  StyleSheet,
  Image,
} from "react-native";

function getMaxId(courseGoals) {
  return courseGoals.reduce((max, item) => Math.max(max, item.id), 0);
}

function GoalInput(props) {
  const [enteredGoalText, setEnteredGoalText] = useState("");

  function addGoalHandler() {
    props.setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { content: enteredGoalText, id: getMaxId(currentCourseGoals) + 1 },
    ]);
    // console.log(props.courseGoals);
    setEnteredGoalText("");
    props.setModalIsVisible(false);
  }

  return (
    <Modal visible={props.modalIsVisible} animationType="slide">
      <View style={styles.inputContainer}>
        <Image
          source={require("../assets/images/maven.png")}
          style={styles.image}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Your course goal!!"
          onChangeText={setEnteredGoalText}
          value={enteredGoalText}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Add Goal" onPress={addGoalHandler} />
          </View>
          <View style={styles.button}>
            <Button
              title="Close"
              onPress={props.setModalIsVisible.bind(this, false)}
              color="#f31282"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginBottom: 24,
    padding: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: "#cccccc",
    backgroundColor: "#311b6b",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#e4d0ff",
    borderRadius: 6,
    backgroundColor: "#e4d0ff",
    color: "#120438",
    width: "100%",
    padding: 8,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
  },
  button: {
    width: 100,
    marginHorizontal: 8,
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
});
export default GoalInput;
