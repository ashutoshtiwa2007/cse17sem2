// TransactionForm.jsx — The form to add new transactions
// Props received from App.jsx: onAddTransaction (a function to call when submitting)

import React, { useState } from 'react'

function TransactionForm({ onAddTransaction }) {

  // ─────────────────────────────────────────────
  // useState: React "remembers" these values even when the page re-renders
  // title    → what the user types in the "Title" field
  // amount   → what the user types in the "Amount" field
  // type     → what the user selects: "Income" or "Expense"
  // error    → error message to show if validation fails
  // ─────────────────────────────────────────────
  const [title, setTitle]   = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType]     = useState('Income')
  const [error, setError]   = useState('')

  // ─────────────────────────────────────────────
  // handleSubmit: runs when the user clicks "Add Transaction"
  // ─────────────────────────────────────────────
  function handleSubmit(e) {
    // Prevent the browser from refreshing the page (default form behavior)
    e.preventDefault()

    // ── Validation ──
    if (!title.trim()) {
      setError('Please enter a transaction title.')
      return
    }
    if (!amount || Number(amount) <= 0) {
      setError('Please enter a valid amount greater than 0.')
      return
    }

    // ── Build the new transaction object ──
    const newTransaction = {
      id: Date.now(),           // unique ID using current timestamp
      title: title.trim(),      // remove extra spaces from both ends
      amount: Number(amount),   // convert string → number
      type: type,               // "Income" or "Expense"
      date: new Date().toLocaleDateString('en-IN'), // today's date
    }

    // ── Call the function passed from App.jsx to save the transaction ──
    onAddTransaction(newTransaction)

    // ── Reset the form fields after adding ──
    setTitle('')
    setAmount('')
    setType('Income')
    setError('')
  }

  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-header bg-teal-700 text-white py-3 px-4">
        <h5 className="mb-0 font-semibold flex items-center gap-2">
          <i className="bi bi-plus-circle-fill"></i>
          Add New Transaction
        </h5>
      </div>

      <div className="card-body p-4">

        {/* Show error alert if validation fails */}
        {error && (
          <div className="alert alert-danger alert-dismissible py-2 mb-3" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
            <button
              type="button"
              className="btn-close"
              onClick={() => setError('')}   // clicking X clears the error
            ></button>
          </div>
        )}

        {/* Bootstrap form */}
        <form onSubmit={handleSubmit}>
          <div className="row g-3">

            {/* ── Transaction Title Input ── */}
            <div className="col-12 col-md-4">
              <label className="form-label text-gray-600 text-sm font-medium">
                Transaction Title
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Salary, Rent, Coffee..."
                value={title}
                // onChange updates the title state every time the user types
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* ── Amount Input ── */}
            <div className="col-12 col-sm-6 col-md-3">
              <label className="form-label text-gray-600 text-sm font-medium">
                Amount (₹)
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="e.g. 5000"
                value={amount}
                min="1"
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            {/* ── Type Dropdown ── */}
            <div className="col-12 col-sm-6 col-md-3">
              <label className="form-label text-gray-600 text-sm font-medium">
                Type
              </label>
              <select
                className="form-select"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="Income">💰 Income</option>
                <option value="Expense">💸 Expense</option>
              </select>
            </div>

            {/* ── Submit Button ── */}
            <div className="col-12 col-md-2 flex items-end">
              <button
                type="submit"
                className="btn btn-success w-100 flex items-center justify-center gap-2 py-2"
              >
                <i className="bi bi-plus-lg"></i>
                <span>Add</span>
              </button>
            </div>

          </div>
        </form>

      </div>
    </div>
  )
}

export default TransactionForm
