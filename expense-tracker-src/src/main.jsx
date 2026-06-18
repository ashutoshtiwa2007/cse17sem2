// main.jsx — The entry point of the React app
// This file mounts the root React component into the HTML page

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// ReactDOM.createRoot finds the <div id="root"> in index.html
// and renders the entire React app inside it
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
