import { DrawerItemList } from "@react-navigation/drawer";
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import HowToUse from "./HowToUse";
const statIcon = require("../assets/stat.png");

const DrawerContent = (props) => {
  return (
    <View style={styles.drawerBody}>
      <View style={styles.header}>
        <Image source={statIcon} style={styles.headerImage} />
        <View>
          <Text style={styles.headerText}>Statistics Calculator</Text>
        </View>
      </View>
      <View style={styles.nav}>
        <DrawerItemList {...props} />
      </View>
      <HowToUse w="100%" pv={6} />
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  drawerBody: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 35,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#616161",
  },
  headerImage: {
    height: 35,
    width: 35,
  },
  nav: {
    marginTop: 25,
  },
});
