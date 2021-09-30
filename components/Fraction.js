import React from "react";
import { Text, View } from "react-native";

const Fraction = ({ nume, denom }) => {
  return (
    <View style={{ maxWidth: 200 }}>
      <View>
        <Text style={{ textAlign: "center" }}>{nume}</Text>
      </View>
      <View style={{ width: "100%", borderWidth: 1, borderColor: "#000" }} />
      <View>
        <Text style={{ textAlign: "center" }}>{denom}</Text>
      </View>
    </View>
  );
};

export default Fraction;
