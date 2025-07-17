import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import { ExpenseContext } from "../context/ExpenseContext";
import ExpenseItem from "../components/ExpenseItem";
import CategoryPieChart from "../components/CategoryPieChart";
import ExpenseChart from "../components/ExpenseChart";

const categories = ["Food", "Transport", "Bills", "Shopping", "Other"];

export default function HomeScreen() {
  const { expenses, addExpense, total } = useContext(ExpenseContext);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [filter, setFilter] = useState("All");
  const filteredExpenses =
    filter === "All" ? expenses : expenses.filter((e) => e.category === filter);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>💰 Expense Tracker</Text>

        <CategoryPieChart />
        <ExpenseChart />

        <Text style={styles.total}>Total: ₹{total.toFixed(2)}</Text>

        <View style={styles.form}>
          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>📝 Description</Text>
            <TextInput
              placeholder="Enter expense description"
              value={desc}
              onChangeText={setDesc}
              style={styles.input}
              placeholderTextColor="#888"
            />
          </View>

          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>💸 Amount</Text>
            <TextInput
              placeholder="Enter amount"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              style={styles.input}
              placeholderTextColor="#888"
            />
          </View>

          <Text style={styles.label}>Select Category</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={category}
              onValueChange={(item) => setCategory(item)}
              style={styles.picker}
              itemStyle={{ color: "#4B0082", fontSize: 16, fontWeight: "600" }}
              mode="dropdown"
            >
              {categories.map((cat) => (
                <Picker.Item label={cat} value={cat} key={cat} />
              ))}
            </Picker>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (desc && amount) {
                addExpense(desc, parseFloat(amount), category);
                setDesc("");
                setAmount("");
              }
            }}
          >
            <Text style={styles.buttonText}>+ Add Expense</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Filter by Category</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={filter}
            onValueChange={(val) => setFilter(val)}
            style={styles.picker}
            itemStyle={{ color: "#4B0082", fontSize: 16, fontWeight: "600" }}
            mode="dropdown"
          >
            <Picker.Item label="All" value="All" />
            {categories.map((cat) => (
              <Picker.Item label={cat} value={cat} key={cat} />
            ))}
          </Picker>
        </View>

        <Text style={styles.sectionTitle}>Expenses</Text>
        {filteredExpenses.length === 0 ? (
          <Text style={styles.emptyText}>No expenses found.</Text>
        ) : (
          <FlatList
            data={filteredExpenses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ExpenseItem item={item} />}
            scrollEnabled={false} // allow ScrollView to handle scroll
          />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#4B0082",
  },
  total: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
  },
  form: {
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    paddingVertical: 8,
    marginBottom: 12,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 12,
    backgroundColor: "#f5f0ff",
    borderColor: "#ccc",
  },
  picker: {
    width: "100%",
  },
  label: {
    fontWeight: "600",
    marginBottom: 6,
  },
  button: {
    backgroundColor: "#4B0082",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 10,
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    fontStyle: "italic",
    marginTop: 10,
  },
  inputBox: {
    marginBottom: 16,
  },

  inputLabel: {
    marginBottom: 6,
    color: "#4B0082",
    fontWeight: "600",
    fontSize: 14,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#f9f7fd",
    color: "#333",
  },
});
