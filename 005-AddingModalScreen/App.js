import { useState } from "react";
import { Text, View, FlatList, Button } from "react-native";

import GoalInput from "./components/GoalInput.js";
import GoalItem from "./components/GoalItem.js";

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  function onDeleteItem(id) {
    setCourseGoals((prev) => prev.filter((ele) => ele.id !== id));
  }

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 16,
        // alignItems: "center",
      }}
    >
      <Button
        title="Add New Goal"
        color="#5e0acc"
        onPress={setModalIsVisible.bind(this, true)}
      />
      {modalIsVisible && (
        <GoalInput
          setCourseGoals={setCourseGoals}
          modalIsVisible={modalIsVisible}
          setModalIsVisible={setModalIsVisible}
        />
      )}
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
          //console.log(item); //{"content": "Web222", "id": 1}
          return item.id.toString();
        }}
      />
      <Text>Demo</Text>
    </View>
  );
}
