import React, { useContext } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { ExpenseContext } from "../context/ExpenseContext";

const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#8A2BE2", "#FF7F50"];

export default function CategoryPieChart() {
  const { categoryTotals } = useContext(ExpenseContext);
  const screenWidth = Dimensions.get("window").width;

  const data = Object.keys(categoryTotals).map((cat, i) => ({
    name: cat,
    amount: categoryTotals[cat],
    color: colors[i % colors.length],
    legendFontColor: "#333",
    legendFontSize: 14,
  }));

  if (data.length === 0) {
    return (
      <View style={styles.noData}>
        <Text style={styles.noDataText}>No data to display</Text>
      </View>
    );
  }

  return (
    <View style={styles.chartContainer}>
      <PieChart
        data={data}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          color: () => `#000`,
        }}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  noData: {
    alignItems: "center",
    marginBottom: 20,
  },
  noDataText: {
    color: "#777",
  },
});
