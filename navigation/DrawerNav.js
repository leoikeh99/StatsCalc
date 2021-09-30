import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import TabNav from "../navigation/TabNav";
import Home from "../screens/Home";
import DrawerContent from "../components/DrawerContent";
import SavedWorkStack from "./SavedWorkStack";
import Icon from "react-native-vector-icons/FontAwesome5";

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          drawerActiveTintColor: "#2196f3",
          drawerIcon: ({ color, size }) =>
            route.name === "Home" ? (
              <Icon name="home" color={color} size={20} />
            ) : route.name === "Calculator" ? (
              <Icon name="calculator" color={color} size={20} />
            ) : (
              <Icon name="save" color={color} size={20} />
            ),
        })}
        drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            headerBackground: () => <View style={styles.view}></View>,
            headerTintColor: "#fff",
            headerTitle: () => <Text style={styles.headerText}>Home</Text>,
          }}
        />
        <Drawer.Screen
          name="Calculator"
          component={TabNav}
          options={{
            headerBackground: () => <View style={styles.view}></View>,
            headerTintColor: "#fff",
            headerTitle: () => (
              <Text style={styles.headerText}>Calculator</Text>
            ),
          }}
        />
        <Drawer.Screen
          name="Saved Work"
          component={SavedWorkStack}
          options={{
            headerBackground: () => <View style={styles.view}></View>,
            headerTintColor: "#fff",
            headerTitle: () => (
              <Text style={styles.headerText}>Saved Work</Text>
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNav;

const styles = StyleSheet.create({
  view: {
    backgroundColor: "#2196f3",
    height: "100%",
  },
  headerText: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
  },
});
