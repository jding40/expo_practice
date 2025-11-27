import { useState } from "react";
import { Text, View, FlatList } from "react-native";

import GoalInput from "./components/GoalInput.js";
import GoalItem from "./components/GoalItem.js";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);

  function onDeleteItem(id) {
    setCourseGoals((prev) => prev.filter((ele) => ele.id !== id));
  }

  return (
    <View style={{ flex: 1, paddingTop: 50, paddingHorizontal: 16 }}>
      <GoalInput setCourseGoals={setCourseGoals} />
      <FlatList
        data={courseGoals}
        renderItem={(itemData) => {
          console.log("itemData is: ", itemData); //itemData is:  {"index": 0, "item": {"content": "Web222", "id": 1},...
          return (
            <GoalItem
              text={itemData.item.content}
              id={itemData.item.id}
              setCourseGoals={setCourseGoals}
              pressHandler={onDeleteItem}
            />
          );
        }}
        keyExtractor={(item) => {
          // 也可以写成(item, index)=>{return index}
          console.log(item); //{"content": "Web222", "id": 1}
          return item.id.toString();
        }}
      />
      <Text>Demo</Text>
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
//   textInput: {a
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
