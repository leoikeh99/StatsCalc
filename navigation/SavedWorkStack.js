import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Saves from "../screens/Saves";
import ViewSave from "../screens/ViewSave";

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="All Saved Calculations" component={Saves} />
      <Stack.Screen name="View Save" component={ViewSave} />
    </Stack.Navigator>
  );
};

export default MyStack;
