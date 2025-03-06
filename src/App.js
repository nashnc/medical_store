import react, { useState } from "react";
import Navbar from "./components/Navbar";
import { NavLink } from "react-router-dom";

function App() {
  const user = JSON.parse(localStorage.getItem("user")) || [];

  return (
    <div>
      <Navbar />
      {user.email ? (
        <>
          <h1> Welcome back {user.email}</h1>
        </>
      ) : (
        <h1>Hello Guest! Please Login</h1>
      )}
    </div>
  );
}

export default App;
