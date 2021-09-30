import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
const statIcon = require("../assets/stat.png");
import Icon from "react-native-vector-icons/FontAwesome5";
import HowToUse from "../components/HowToUse";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.headerImage}
          source={statIcon}
          style={styles.headerImage}
        />
        <Text style={styles.headerText}>Statistics Calculator</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("Calculator")}>
          <Icon name="calculator" color="#fff" size={45} />
          <Text style={styles.btnText}>Calculator</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("Saved Work")}>
          <Icon name="save" color="#fff" size={45} />
          <Text style={styles.btnText}>Saved Work</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.vidBtn}>
        <HowToUse w="100%" pv={10} />
      </View>
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerImage: {
    height: 40,
    width: 40,
  },
  headerText: {
    fontSize: 25,
    marginLeft: 10,
    color: "#616161",
    fontWeight: "bold",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    height: 300,
    paddingTop: 60,
  },
  btn: {
    backgroundColor: "#2196f3",
    paddingVertical: 20,
    borderRadius: 15,
    width: 145,
    marginHorizontal: 10,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold",
  },
  vidBtn: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 30,
  },
});
