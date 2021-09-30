import React, { useContext } from "react";
import { Text, ScrollView } from "react-native";
import { saveContext } from "../context/SaveContext";
import UngroupedDataSolution from "../components/UngroupedDataSolution";
import GroupedDataSolution from "../components/GroupedDataSolution";
import moment from "moment";

const ViewSave = ({ navigation }) => {
  const SaveContext = useContext(saveContext);
  const { viewSave } = SaveContext;

  return (
    <ScrollView style={{ paddingHorizontal: 15 }}>
      <Text style={{ paddingVertical: 10 }}>
        Saved on: {moment(viewSave.time).format("llll")}
      </Text>
      {viewSave.type === "ungroupedData" ? (
        <UngroupedDataSolution
          table={viewSave.table}
          table2={viewSave.table2}
        />
      ) : (
        <GroupedDataSolution table={viewSave.table} table2={viewSave.table2} />
      )}
    </ScrollView>
  );
};
export default ViewSave;
