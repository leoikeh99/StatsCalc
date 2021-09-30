import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { Table, TableWrapper, Cols, Row } from "react-native-table-component";

import Fraction from "../components/Fraction";

const GroupedDataSolution = ({ table, table2 }) => {
  const showMedianVariables = () => {
    Alert.alert(
      "Median formula values",
      "L = The lower class boundary of the group containing the median\n\nn = Sum of frequencies\n\nB = The cumulative frequency of the group before the median group\n\nG = The frequency of the median group\n\nw = The group width",

      [{ text: "OK" }]
    );
  };

  const showModalVariables = () => {
    Alert.alert(
      "Mode formula values",
      "L = the lower class boundary of the modal group\n\nFmb = the frequency of the group before the modal group\n\nFm = the frequency of the modal group\n\nFma is the frequency of the group after the modal group\n\nW = the group width",

      [{ text: "OK" }]
    );
  };
  return (
    <View>
      <View>
        <Text
          style={{
            marginBottom: 10,
            fontSize: 17,
            textDecorationLine: "underline",
          }}>
          Table
        </Text>
        <Table borderStyle={{ borderWidth: 2, borderColor: "#2196f3" }}>
          <TableWrapper>
            <Row data={table.tableTitle} style={styles.tableTitle} />
            <Cols
              data={table.tableData}
              heightArr={[40, 30, 30, 30, 30]}
              style={styles.tableData}
            />
            <Row data={table.tableSums} style={styles.tableTitle} />
          </TableWrapper>
        </Table>
      </View>
      <View style={{ marginTop: 15 }}>
        <Table borderStyle={{ borderWidth: 2, borderColor: "#2196f3" }}>
          <TableWrapper>
            <Row data={table2.tableTitle} style={styles.tableTitle} />
            <Cols
              data={table2.tableData}
              heightArr={[40, 30, 30, 30, 30]}
              style={styles.tableData}
            />
            <Row data={table2.tableSums} style={styles.tableTitle} />
          </TableWrapper>
        </Table>
      </View>
      <View>
        <Text
          style={{
            marginTop: 20,
            fontSize: 17,
            textDecorationLine: "underline",
          }}>
          Solution
        </Text>
        <View>
          <View style={styles.answer}>
            <Text>Mean:</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text>= </Text>
              <Fraction nume={"∑f(x)"} denom={"∑f"} />
              <Text> = </Text>
              <Fraction
                nume={table.tableData[3].reduce((a, b) => a + b)}
                denom={table.tableData[2].reduce((a, b) => a + b)}
              />
              <Text> = {table.mean.toFixed(3)}</Text>
            </View>
          </View>
          <View style={styles.answer}>
            <Text>Median:</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text>= </Text>
              <Text>L + </Text>
              <Fraction nume="(n/2) - B" denom="G" />
              <Text> x W</Text>
              <TouchableOpacity
                style={styles.btn2}
                onPress={showMedianVariables}>
                <Text style={{ color: "#fff", fontSize: 8 }}>More info</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text>= </Text>
              <Text>{table.medianValues.L} + </Text>
              <Fraction
                nume={`(${table.medianValues.n}/2)-${table.medianValues.B}`}
                denom={table.medianValues.G}
              />
              <Text> x {table.medianValues.W}</Text>
              <Text> = {table.median.toFixed(3)}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}></View>
          </View>
          <View style={styles.answer}>
            <Text>Mode:</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text>= </Text>
              <Text>L + </Text>
              <Fraction nume=" Fm - Fmb" denom="(Fm − Fmb) + (Fm − Fma)" />
              <Text> x W</Text>
              <TouchableOpacity
                style={styles.btn2}
                onPress={showModalVariables}>
                <Text style={{ color: "#fff", fontSize: 8 }}>More info</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text>= </Text>
              <Text>{table.modalValues.L} + </Text>
              <Fraction
                nume={`${table.modalValues.fm} - ${table.modalValues.fmb}`}
                denom={`(${table.modalValues.fm} - ${table.modalValues.fmb}) + (${table.modalValues.fm} - ${table.modalValues.fma})`}
              />
              <Text> x {table.modalValues.W}</Text>
              <Text> = {table.mode.toFixed(3)}</Text>
            </View>
          </View>

          <View style={styles.answer}>
            <Text>Variance:</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text>= </Text>
              <Fraction nume={"∑F((x - x̄)^2)"} denom={"∑f"} />
              <Text> = </Text>
              <Fraction
                nume={table2.tableData[3].reduce((a, b) => a + b).toFixed(3)}
                denom={table.tableData[2].reduce((a, b) => a + b)}
              />
              <Text> = {table2.variance.toFixed(4)}</Text>
            </View>
          </View>
        </View>
        <View style={styles.answer}>
          <Text>Standard Deviation:</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>= </Text>
            <Text>√ Variance</Text>
            <Text> = </Text>
            <Text>√ {table2.variance.toFixed(3)}</Text>
            <Text> = {table2.sd.toFixed(5)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default GroupedDataSolution;

const styles = StyleSheet.create({
  tableTitle: {
    backgroundColor: "#e3f2fd",
  },
  tableData: {},
  btn2: {
    backgroundColor: "#2196f3",
    padding: 2,
    paddingHorizontal: 5,
    borderRadius: 6,
    marginLeft: 10,
  },
  answer: {
    borderWidth: 2,
    borderColor: "#2196f3",
    padding: 5,
    marginBottom: 5,
  },
});
