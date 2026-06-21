import { useState, useEffect } from "react";
import axios from "axios";
import TransactionForm from "./components/TransactionForm";
import ExpenseChart from "./components/ExpenseChart";
import TransactionList from "./components/TransactionList";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // 1. Define fetch function to sync with backend
  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/transactions",
      );
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  // 2. Initial load
  useEffect(() => {
    // Schedule the initial fetch after paint to avoid synchronous setState in effect
    const t = setTimeout(() => fetchTransactions(), 0);
    return () => clearTimeout(t);
  }, []);

  const currentTransaction = transactions.find(t => t._id === editingId);

  // 3. Add function that triggers a refresh
  const addTransaction = async (formData) => {
    try {
      await axios.post("http://localhost:5000/api/transactions", formData);
      fetchTransactions(); // Refresh the data
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const handleEdit = (transaction) => {
    setEditingId(transaction._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateTransaction = async (id, formData) => {
    try {
      await axios.put(`http://localhost:5000/api/transactions/${id}`, formData);
      setEditingId(null); // Reset mode
      fetchTransactions(); // Refresh
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  const deleteTransaction = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await axios.delete(`http://localhost:5000/api/transactions/${id}`);
        fetchTransactions(); // Refresh list after deletion
      } catch (error) {
        console.error("Error deleting transaction:", error);
      }
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Budget Tracker
        </h1>

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <ExpenseChart transactions={transactions} />
          <TransactionForm onAddTransaction={addTransaction} editingId={editingId} onUpdate={updateTransaction} currentTransaction={currentTransaction} setEditingId={setEditingId} />
        </div>

        {/* Bottom Section */}
        <TransactionList
          transactions={transactions}
          onDelete={deleteTransaction}
          editingId={editingId}
          onUpdate={updateTransaction}
          onEdit={handleEdit}
        />
      </div>
    </main>
  );
};

export default App;
