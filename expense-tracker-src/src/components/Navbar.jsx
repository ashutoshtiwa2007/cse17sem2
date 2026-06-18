// Navbar.jsx — The top navigation bar of the app
// This is a simple presentational component — it only displays UI, no logic

import React from 'react'

function Navbar() {
  return (
    // Bootstrap navbar with a custom teal background using Tailwind
    <nav className="navbar navbar-dark bg-teal-700 shadow-lg">
      <div className="container">
        
        {/* Left side: App icon + Title */}
        <a className="navbar-brand flex items-center gap-2 text-xl font-bold" href="#">
          {/* Bootstrap Icon for wallet */}
          <i className="bi bi-wallet2 text-2xl text-yellow-300"></i>
          <span className="text-white tracking-wide">Expense Tracker</span>
        </a>

        {/* Right side: Current date display */}
        <span className="text-teal-200 text-sm hidden sm:block">
          {/* JavaScript's Date object to show today's date */}
          {new Date().toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>

      </div>
    </nav>
  )
}

// Export so other files can import and use this component
export default Navbar
