// BalanceCard.jsx — Shows the financial summary at the top
// Props received from App.jsx: transactions (array of all transactions)

import React from 'react'

function BalanceCard({ transactions }) {

  // ─────────────────────────────────────────────
  // STEP 1: Calculate total income
  // .filter() keeps only "Income" type transactions
  // .reduce() adds up all their amounts, starting from 0
  // ─────────────────────────────────────────────
  const totalIncome = transactions
    .filter(t => t.type === 'Income')
    .reduce((sum, t) => sum + t.amount, 0)

  // ─────────────────────────────────────────────
  // STEP 2: Calculate total expenses (same logic)
  // ─────────────────────────────────────────────
  const totalExpense = transactions
    .filter(t => t.type === 'Expense')
    .reduce((sum, t) => sum + t.amount, 0)

  // ─────────────────────────────────────────────
  // STEP 3: Balance = Income - Expenses
  // ─────────────────────────────────────────────
  const balance = totalIncome - totalExpense

  // Helper function to format numbers as Indian Rupees
  // e.g., 1500 → ₹1,500.00
  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount)
  }

  return (
    <div className="row g-3 mb-4">

      {/* ── BALANCE CARD ── */}
      <div className="col-12 col-md-4">
        <div className="card border-0 shadow-sm h-100"
          style={{ background: 'linear-gradient(135deg, #0f766e, #14b8a6)' }}>
          <div className="card-body text-white p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-teal-100 text-sm font-medium uppercase tracking-wider mb-0">
                Total Balance
              </p>
              <div className="bg-white bg-opacity-20 rounded-full p-2">
                <i className="bi bi-bank text-xl"></i>
              </div>
            </div>
            {/* Show balance, turn red if negative */}
            <h2 className={`text-3xl font-bold mb-0 ${balance < 0 ? 'text-red-300' : 'text-white'}`}>
              {formatCurrency(balance)}
            </h2>
            <p className="text-teal-200 text-xs mt-2 mb-0">
              {balance < 0 ? '⚠ You are overspending!' : '✓ You are on track'}
            </p>
          </div>
        </div>
      </div>

      {/* ── INCOME CARD ── */}
      <div className="col-12 col-sm-6 col-md-4">
        <div className="card border-0 shadow-sm h-100 bg-white">
          <div className="card-body p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-0">
                Total Income
              </p>
              {/* Green circle icon */}
              <div className="bg-green-100 rounded-full p-2">
                <i className="bi bi-arrow-down-circle-fill text-green-600 text-xl"></i>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-green-600 mb-1">
              {formatCurrency(totalIncome)}
            </h3>
            <p className="text-gray-400 text-xs mb-0">
              {transactions.filter(t => t.type === 'Income').length} transaction(s)
            </p>
          </div>
        </div>
      </div>

      {/* ── EXPENSE CARD ── */}
      <div className="col-12 col-sm-6 col-md-4">
        <div className="card border-0 shadow-sm h-100 bg-white">
          <div className="card-body p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-0">
                Total Expenses
              </p>
              {/* Red circle icon */}
              <div className="bg-red-100 rounded-full p-2">
                <i className="bi bi-arrow-up-circle-fill text-red-500 text-xl"></i>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-red-500 mb-1">
              {formatCurrency(totalExpense)}
            </h3>
            <p className="text-gray-400 text-xs mb-0">
              {transactions.filter(t => t.type === 'Expense').length} transaction(s)
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default BalanceCard
