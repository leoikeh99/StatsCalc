import React from "react";
import { Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const HowToUse = ({ w, pv }) => {
  return (
    <TouchableOpacity
      style={{ ...styles.btn, width: w, paddingVertical: pv }}
      onPress={() =>
        Linking.openURL("https://www.youtube.com/watch?v=mk_yJGdH5zs")
      }>
      <Icon name="youtube" size={27} color="#fff" />
      <Text style={styles.btnText}>How to use</Text>
    </TouchableOpacity>
  );
};

export default HowToUse;

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    textAlign: "center",
    bottom: 20,
    marginLeft: 15,
    backgroundColor: "#2196f3",
    borderRadius: 25,
  },
  btnText: {
    marginLeft: 15,
    fontSize: 18,
    color: "#fff",
  },
});
