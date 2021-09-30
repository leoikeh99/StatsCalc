import * as React from "react";
import { Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import GroupedData from "../screens/GroupedData";
import UngroupedData from "../screens/UngroupedData";
import Icon from "react-native-vector-icons/FontAwesome5";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) =>
          route.name === "Grouped Data" ? (
            <Icon name="object-group" size={size} color={color} />
          ) : (
            <Icon name="object-ungroup" size={size} color={color} />
          ),
        tabBarActiveTintColor: "#2196f3",
      })}>
      <Tab.Screen name="Ungrouped Data" component={UngroupedData} />
      <Tab.Screen name="Grouped Data" component={GroupedData} />
    </Tab.Navigator>
  );
}
