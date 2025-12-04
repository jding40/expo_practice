import { Text, View, Pressable, StyleSheet } from "react-native";

function GoalItem(props) {
  return (
    //onPress={() => pressHandler(props.id)}
    <View>
      <Pressable
        android_ripple={{ color: "#00ffff" }}
        onPress={props.pressHandler.bind(this, props.id)}
        style={(pressData) =>
          //if (pressData.pressed) return styles.pressedItem;
          pressData.pressed && styles.pressedItem
        }
      >
        <Text
          style={{
            color: "white",
            backgroundColor: "blue",
            padding: 8,
            borderRadius: 6,
            marginVertical: 6,
          }}
        >
          {props.text}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  pressedItem: {
    opacity: 0.5,
  },
});

export default GoalItem;
