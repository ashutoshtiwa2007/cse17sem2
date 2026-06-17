import React from "react";

function App() {
  return (
    <div
      style={{
        backgroundColor: "#d3d3d3",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "25px",
          borderRadius: "10px",
          width: "320px",
          boxShadow: "0px 0px 10px gray",
        }}
      >
        <h2 style={{ textAlign: "center" }}>
          Student Registration Form
        </h2>

        <input
          type="text"
          placeholder="Student Name"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <input
          type="email"
          placeholder="Email"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <input
          type="text"
          placeholder="Course"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <input
          type="text"
          placeholder="Mobile Number"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
          }}
        />

        <button
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default App;