import moment from "moment";
import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { shorten } from "../functions";
import { saveContext } from "../context/SaveContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SaveItem = ({ save, navigation, setSaves }) => {
  const SaveContext = useContext(saveContext);
  const { setViewItem } = SaveContext;

  const ViewSave = () => {
    setViewItem(save);
    navigation.navigate("View Save");
  };

  const deleteSave = (key) => {
    AsyncStorage.getItem("savedWork").then((value) => {
      AsyncStorage.setItem(
        "savedWork",
        JSON.stringify(JSON.parse(value).filter((val) => val.key !== key))
      );
      setSaves(JSON.parse(value).filter((val) => val.key !== key));
      ToastAndroid.show("Save deleted", ToastAndroid.SHORT);
    });
  };
  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={ViewSave} style={{ width: "80%" }}>
        {save.type === "ungroupedData" ? (
          <Text style={{ fontSize: 17 }}>
            Values:
            {shorten(save.table.tableData[0], 12)}
          </Text>
        ) : (
          <Text style={{ fontSize: 17 }}>
            Class Intervals:
            {shorten(save.table.tableData[0], 3)}
          </Text>
        )}
        <Text style={{ fontSize: 17 }}>
          Frequencies:
          {save.type === "ungroupedData"
            ? shorten(save.table.tableData[1], 12)
            : shorten(save.table.tableData[2], 12)}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon name="clock" color="#616161" type="font-awesome" size={15} />
          <Text style={{ color: "#616161", marginLeft: 6 }}>
            {moment(save.time).calendar()}
          </Text>
        </View>
      </TouchableOpacity>
      <Icon
        name="trash"
        color="#ef5350"
        type="font-awesome"
        size={20}
        onPress={() => deleteSave(save.key)}
      />
    </View>
  );
};
export default SaveItem;

const styles = StyleSheet.create({
  item: {
    padding: 5,
    borderWidth: 2,
    borderColor: "#2196f3",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 5,
  },
});
