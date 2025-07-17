import React, { useContext } from "react";
import { Dimensions, View, Text, StyleSheet, ScrollView } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { ExpenseContext } from "../context/ExpenseContext";

const screenWidth = Dimensions.get("window").width;
const chartWidth = screenWidth - 32; // match padding from wrapper (16 + 16)

export default function ExpenseChart() {
  const { expenses } = useContext(ExpenseContext);

  const grouped = {};
  expenses.forEach((e) => {
    grouped[e.desc] = (grouped[e.desc] || 0) + e.amount;
  });

  const labels = Object.keys(grouped);
  const data = Object.values(grouped);

  if (labels.length === 0) {
    return (
      <View style={styles.noDataBox}>
        <Text style={styles.noDataText}>📉 No expenses to show in chart</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>📊 Expense Breakdown</Text>

      <ScrollView horizontal contentContainerStyle={{ paddingRight: 16 }}>
        <BarChart
          data={{
            labels,
            datasets: [{ data }],
          }}
          width={Math.max(chartWidth, labels.length * 60)} // adaptive width
          height={250}
          fromZero
          showValuesOnTopOfBars
          yAxisLabel="₹"
          chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#4B0082",
            backgroundGradientTo: "#6A0DAD",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255,255,255,${opacity})`,
            propsForBackgroundLines: {
              stroke: "#ccc",
            },
            barPercentage: 0.6,
          }}
          style={styles.chartStyle}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  chartStyle: {
    borderRadius: 16,
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
    color: "#4B0082",
  },
  noDataBox: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    marginHorizontal: 20,
  },
  noDataText: {
    color: "#888",
    fontSize: 16,
    fontStyle: "italic",
  },
});
