import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Table, TableWrapper, Cols, Row } from "react-native-table-component";
import Fraction from "../components/Fraction";

const GroupedDataSolution = ({ table, table2 }) => {
  return (
    <View>
      {table && (
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
      )}
      {table2 && (
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
      )}

      {table && (
        <View>
          <Text
            style={{
              marginTop: 20,
              fontSize: 17,
              textDecorationLine: "underline",
            }}>
            Solution
          </Text>
          <View style={styles.answer}>
            <Text>Mean:</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text>= </Text>
              <Fraction nume={"∑f(x)"} denom={"∑f"} />
              <Text> = </Text>
              <Fraction
                nume={table.tableData[2].reduce((a, b) => a + b)}
                denom={table.tableData[1].reduce((a, b) => a + b)}
              />
              <Text> = {table.mean.toFixed(4)}</Text>
            </View>
          </View>
          <View style={styles.answer}>
            <Text>Median: {table.median}</Text>
          </View>
          <View style={styles.answer}>
            <Text>Mode: {table.mode}</Text>
          </View>
          <View style={styles.answer}>
            <Text>Variance:</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text>= </Text>
              <Fraction nume={"∑F((x - x̄)^2)"} denom={"∑f"} />
              <Text> = </Text>
              <Fraction
                nume={table2.tableData[2].reduce((a, b) => a + b).toFixed(3)}
                denom={table.tableData[1].reduce((a, b) => a + b)}
              />
              <Text> = {table2.variance.toFixed(3)}</Text>
            </View>
          </View>
          <View style={styles.answer}>
            <Text>Standard Deviation:</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text>= </Text>
              <Text>√ Variance</Text>
              <Text> = </Text>
              <Text>√ {table2.variance.toFixed(4)}</Text>
              <Text> = {table2.sd.toFixed(4)}</Text>
            </View>
          </View>
        </View>
      )}
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
