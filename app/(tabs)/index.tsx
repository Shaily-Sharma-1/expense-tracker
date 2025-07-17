import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import {ExpenseProvider} from "./context/ExpenseContext";
import Home from "./screens/Home";

export default function HomeScreen() {
  return (
  <ExpenseProvider>
    <ScrollView contentContainerStyle={styles.container}>
      <Home />      
    </ScrollView>
    </ExpenseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
    marginTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  balanceContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#555',
  },
  balance: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4B0082',
  },
  button: {
    backgroundColor: '#4B0082',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  expenseItem: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expenseAmount: {
    color: 'red',
    fontWeight: '600',
  },
});
