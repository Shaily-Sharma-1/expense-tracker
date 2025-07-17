import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    loadExpenses();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const loadExpenses = async () => {
    const data = await AsyncStorage.getItem("expenses");
    if (data) setExpenses(JSON.parse(data));
  };

  const addExpense = (desc, amount, category) => {
    setExpenses((prev) => [
      ...prev,
      { id: Date.now().toString(), desc, amount, category },
    ]);
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  const total = expenses.reduce((acc, cur) => acc + cur.amount, 0);

  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  return (
    <ExpenseContext.Provider
      value={{ expenses, addExpense, deleteExpense, total, categoryTotals }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
