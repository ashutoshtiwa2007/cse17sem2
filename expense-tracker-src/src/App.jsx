// App.jsx — The ROOT component of the entire app
// This is where all state lives and all components come together
// Think of this as the "brain" of the application

import React, { useState } from 'react'

// Import all the components we built
import Navbar from './components/Navbar.jsx'
import BalanceCard from './components/BalanceCard.jsx'
import TransactionForm from './components/TransactionForm.jsx'
import TransactionTable from './components/TransactionTable.jsx'

function App() {

  // ─────────────────────────────────────────────────────────────────
  // useState with localStorage
  //
  // When the app first loads, we try to read saved data from localStorage.
  // localStorage is the browser's built-in storage — data stays even
  // after the browser tab is closed or the page is refreshed.
  //
  // JSON.parse converts the stored string back into a JavaScript array.
  // If nothing is saved yet, we start with an empty array [].
  // ─────────────────────────────────────────────────────────────────
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem('expense-tracker-data')
      // If data exists, parse it. Otherwise use empty array.
      return saved ? JSON.parse(saved) : []
    } catch {
      // If parsing fails (corrupted data), start fresh
      return []
    }
  })

  // ─────────────────────────────────────────────────────────────────
  // showAlert state — controls the success notification popup
  // ─────────────────────────────────────────────────────────────────
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  // ─────────────────────────────────────────────────────────────────
  // Helper: saveToLocalStorage
  // Every time we change the transactions list, we also save it
  // to localStorage so it persists after page refresh.
  // JSON.stringify converts the array to a string for storage.
  // ─────────────────────────────────────────────────────────────────
  function saveToLocalStorage(updatedTransactions) {
    localStorage.setItem('expense-tracker-data', JSON.stringify(updatedTransactions))
  }

  // ─────────────────────────────────────────────────────────────────
  // handleAddTransaction
  // Called by TransactionForm when user clicks "Add"
  // newTransaction is the object built in TransactionForm.jsx
  // ─────────────────────────────────────────────────────────────────
  function handleAddTransaction(newTransaction) {
    // Add the new transaction to the front of the list (newest first)
    const updated = [newTransaction, ...transactions]

    // Update React state (this causes the UI to re-render)
    setTransactions(updated)

    // Save the updated list to localStorage
    saveToLocalStorage(updated)

    // Show a success alert
    triggerAlert(`✅ "${newTransaction.title}" added successfully!`)
  }

  // ─────────────────────────────────────────────────────────────────
  // handleDeleteTransaction
  // Called by TransactionTable when user clicks "Delete"
  // id is the unique ID of the transaction to remove
  // ─────────────────────────────────────────────────────────────────
  function handleDeleteTransaction(id) {
    // .filter() creates a new array without the deleted item
    // We keep all transactions EXCEPT the one with the matching id
    const updated = transactions.filter(t => t.id !== id)

    setTransactions(updated)
    saveToLocalStorage(updated)

    triggerAlert('🗑 Transaction deleted.')
  }

  // ─────────────────────────────────────────────────────────────────
  // handleClearAll
  // Deletes ALL transactions at once and clears localStorage
  // ─────────────────────────────────────────────────────────────────
  function handleClearAll() {
    // Ask for confirmation before deleting everything
    if (window.confirm('Are you sure you want to delete ALL transactions? This cannot be undone.')) {
      setTransactions([])
      localStorage.removeItem('expense-tracker-data')
      triggerAlert('🗑 All transactions cleared.')
    }
  }

  // ─────────────────────────────────────────────────────────────────
  // triggerAlert — shows a temporary notification for 3 seconds
  // ─────────────────────────────────────────────────────────────────
  function triggerAlert(message) {
    setAlertMessage(message)
    setShowAlert(true)
    // After 3000ms (3 seconds), hide the alert automatically
    setTimeout(() => setShowAlert(false), 3000)
  }

  // ─────────────────────────────────────────────────────────────────
  // JSX Return — what gets rendered on the screen
  // ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-100">

      {/* ── NAVIGATION BAR ── */}
      <Navbar />

      {/* ── MAIN CONTENT AREA ── */}
      <div className="container py-6 px-3 px-md-4" style={{ maxWidth: '1100px' }}>

        {/* ── SUCCESS / INFO ALERT TOAST ── */}
        {showAlert && (
          <div
            className="alert alert-success alert-dismissible shadow-sm mb-4 py-3"
            role="alert"
            style={{
              position: 'sticky',
              top: '10px',
              zIndex: 1000,
              borderLeft: '4px solid #16a34a',
            }}
          >
            {alertMessage}
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowAlert(false)}
            ></button>
          </div>
        )}

        {/* ── BALANCE CARDS ── */}
        {/* Pass the transactions array as a prop */}
        <BalanceCard transactions={transactions} />

        {/* ── TRANSACTION FORM ── */}
        {/* Pass the add function as a prop — TransactionForm will call it on submit */}
        <TransactionForm onAddTransaction={handleAddTransaction} />

        {/* ── TRANSACTION TABLE ── */}
        {/* Pass transactions + delete function as props */}
        <TransactionTable
          transactions={transactions}
          onDelete={handleDeleteTransaction}
        />

        {/* ── CLEAR ALL BUTTON (only shows if there are transactions) ── */}
        {transactions.length > 0 && (
          <div className="text-center mt-4">
            <button
              className="btn btn-outline-danger btn-sm rounded-pill px-4"
              onClick={handleClearAll}
            >
              <i className="bi bi-trash3 me-2"></i>
              Clear All Transactions
            </button>
          </div>
        )}

        {/* ── FOOTER ── */}
        <p className="text-center text-gray-400 text-xs mt-6 pb-4">
          💾 Data is saved automatically in your browser's localStorage.
          <br />Built with React + Bootstrap + Tailwind CSS
        </p>

      </div>
    </div>
  )
}

export default App
