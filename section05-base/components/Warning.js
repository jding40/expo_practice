import { Modal, Text, StyleSheet, View, Button } from "react-native";

export default function Warning(props) {
  return (
    <Modal visible={props.warningIsVisible}>
      <View style={styles.warningContainer}>
        <Text>Wrong input!</Text>
        <Button
          title="Confirm"
          color="blue"
          onPress={props.setWarningIsVisible.bind(this, false)}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  warningContainer: {
    paddingVertical: 60,
    paddingHorizontal: 120,
    backgroundColor: "#8a2be2",
    marginVertical: "auto",
    marginHorizontal: "auto",
    justifyContent: "center",
    alignItems: "center",
    // marginHorizontal: 120,
    minWidth: 200,
    maxWidth: 600,
    borderRadius: 20,
  },
});
