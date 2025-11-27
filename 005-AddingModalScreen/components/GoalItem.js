import { Text, View, Pressable, StyleSheet } from "react-native";

function GoalItem(props) {
  return (
    //onPress={() => pressHandler(props.id)}
    <View style={styles.goalItem}>
      <Pressable
        android_ripple={{ color: "#00ffff" }}
        onPress={props.pressHandler.bind(this, props.id)}
        style={(pressData) =>
          //if (pressData.pressed) return styles.pressedItem;
          pressData.pressed && styles.pressedItem
        }
      >
        <Text style={styles.goalText}>{props.text}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  pressedItem: {
    opacity: 0.5,
  },
  goalText: {
    color: "white",
    padding: 8,
  },
});

export default GoalItem;
