import { useState } from "react";
import { View, Button, TextInput } from "react-native";

function getMaxId(courseGoals) {
  return courseGoals.reduce((max, item) => Math.max(max, item.id), 0);
}

function GoalInput(props) {
  const [enteredGoalText, setEnteredGoalText] = useState("");

  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }

  function addGoalHandler() {
    props.setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { content: enteredGoalText, id: getMaxId(currentCourseGoals) + 1 },
    ]);
    // console.log(props.courseGoals);
    setEnteredGoalText("");
  }

  return (
    <View
      style={{ height: 70, backgroundColor: "yellow", flexDirection: "row" }}
    >
      <TextInput
        style={{ borderWidth: 1, width: "70%" }}
        placeholder="Your course goal!!"
        onChangeText={setEnteredGoalText}
        value={enteredGoalText}
      />
      <Button title="Add Goal" onPress={addGoalHandler} />
    </View>
  );
}

export default GoalInput;
