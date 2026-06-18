// TransactionTable.jsx — Displays all transactions in a table
// Props from App.jsx:
//   transactions → the array of all transaction objects
//   onDelete     → function to call when user clicks Delete

import React, { useState } from 'react'

function TransactionTable({ transactions, onDelete }) {

  // ─────────────────────────────────────────────
  // Filter & Search state
  // filterType → "All", "Income", or "Expense"
  // searchText → what user types in the search box
  // ─────────────────────────────────────────────
  const [filterType, setFilterType] = useState('All')
  const [searchText, setSearchText] = useState('')

  // Helper to format currency
  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount)
  }

  // ─────────────────────────────────────────────
  // Apply filters to show the right transactions
  // 1. Filter by type (Income / Expense / All)
  // 2. Filter by search text (case-insensitive title match)
  // ─────────────────────────────────────────────
  const filteredTransactions = transactions
    .filter(t => filterType === 'All' || t.type === filterType)
    .filter(t => t.title.toLowerCase().includes(searchText.toLowerCase()))

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-teal-700 text-white py-3 px-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h5 className="mb-0 font-semibold flex items-center gap-2">
            <i className="bi bi-clock-history"></i>
            Transaction History
            {/* Show count badge */}
            <span className="badge bg-yellow-400 text-gray-800 ms-1">
              {filteredTransactions.length}
            </span>
          </h5>
        </div>
      </div>

      {/* ── Filter & Search Controls ── */}
      <div className="card-body pb-0 px-4 pt-4">
        <div className="row g-2 mb-3">

          {/* Search box */}
          <div className="col-12 col-sm-7">
            <div className="input-group">
              <span className="input-group-text bg-gray-50 border-end-0">
                <i className="bi bi-search text-gray-400"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0 ps-0"
                placeholder="Search transactions..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>

          {/* Filter buttons */}
          <div className="col-12 col-sm-5">
            <div className="btn-group w-100" role="group">
              {['All', 'Income', 'Expense'].map(f => (
                <button
                  key={f}
                  type="button"
                  // Use Bootstrap active class when this filter is selected
                  className={`btn btn-sm ${
                    filterType === f
                      ? f === 'Income'
                        ? 'btn-success'
                        : f === 'Expense'
                        ? 'btn-danger'
                        : 'btn-secondary'
                      : 'btn-outline-secondary'
                  }`}
                  onClick={() => setFilterType(f)}
                >
                  {f === 'All' ? '📋' : f === 'Income' ? '💰' : '💸'} {f}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Transaction Table ── */}
      <div className="card-body pt-0 px-4">

        {/* If no transactions exist at all */}
        {transactions.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-inbox text-gray-300 text-6xl d-block mb-3"></i>
            <p className="text-gray-400 text-lg font-medium mb-1">No transactions yet</p>
            <p className="text-gray-300 text-sm">Add your first transaction using the form above.</p>
          </div>
        ) : filteredTransactions.length === 0 ? (
          // If transactions exist but none match the filter/search
          <div className="text-center py-5">
            <i className="bi bi-funnel text-gray-300 text-5xl d-block mb-3"></i>
            <p className="text-gray-400 font-medium mb-1">No results found</p>
            <p className="text-gray-300 text-sm">Try changing your filter or search term.</p>
          </div>
        ) : (
          // ── The actual Bootstrap table ──
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                  <th className="py-3 ps-3 fw-semibold">#</th>
                  <th className="py-3 fw-semibold">Transaction</th>
                  <th className="py-3 fw-semibold">Type</th>
                  <th className="py-3 fw-semibold">Date</th>
                  <th className="py-3 fw-semibold text-end">Amount</th>
                  <th className="py-3 fw-semibold text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Loop through each filtered transaction */}
                {filteredTransactions.map((transaction, index) => (
                  <tr key={transaction.id} className="border-bottom border-gray-100">

                    {/* Row number */}
                    <td className="py-3 ps-3 text-gray-400 text-sm">
                      {index + 1}
                    </td>

                    {/* Transaction Title with icon */}
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className={`rounded-full p-2 ${
                          transaction.type === 'Income' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          <i className={`bi ${
                            transaction.type === 'Income'
                              ? 'bi-arrow-down-short text-green-600'
                              : 'bi-arrow-up-short text-red-500'
                          } text-lg`}></i>
                        </div>
                        <span className="font-medium text-gray-700">
                          {transaction.title}
                        </span>
                      </div>
                    </td>

                    {/* Type Badge */}
                    <td className="py-3">
                      <span className={`badge rounded-pill px-3 py-2 ${
                        transaction.type === 'Income'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {transaction.type === 'Income' ? '💰' : '💸'} {transaction.type}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-3 text-gray-400 text-sm">
                      {transaction.date}
                    </td>

                    {/* Amount — green for income, red for expense */}
                    <td className={`py-3 text-end font-bold ${
                      transaction.type === 'Income' ? 'text-green-600' : 'text-red-500'
                    }`}>
                      {transaction.type === 'Income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                    </td>

                    {/* Delete Button */}
                    <td className="py-3 text-center">
                      <button
                        className="btn btn-sm btn-outline-danger rounded-pill px-3"
                        // Call onDelete with this transaction's unique ID
                        onClick={() => onDelete(transaction.id)}
                        title="Delete transaction"
                      >
                        <i className="bi bi-trash3 me-1"></i>
                        Delete
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* ── Footer: summary of filtered results ── */}
      {filteredTransactions.length > 0 && (
        <div className="card-footer bg-gray-50 px-4 py-3">
          <p className="text-gray-400 text-sm mb-0">
            Showing <strong>{filteredTransactions.length}</strong> of{' '}
            <strong>{transactions.length}</strong> transactions
          </p>
        </div>
      )}
    </div>
  )
}

export default TransactionTable
