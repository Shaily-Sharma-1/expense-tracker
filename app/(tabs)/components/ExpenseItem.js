import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ExpenseContext } from "../context/ExpenseContext";

export default function ExpenseItem({ item }) {
  const { deleteExpense } = useContext(ExpenseContext);

  return (
    <View style={styles.item}>
      <View>
        <Text style={styles.desc}>{item.desc}</Text>
        <Text style={styles.amount}>₹{item.amount.toFixed(2)}</Text>
      </View>
      <TouchableOpacity onPress={() => deleteExpense(item.id)}>
        <Text style={styles.delete}>❌</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#eee",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  desc: {
    fontSize: 16,
    fontWeight: "600",
  },
  amount: {
    color: "red",
    marginTop: 4,
  },
  delete: {
    fontSize: 18,
    color: "#900",
  },
});
