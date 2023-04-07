import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./Pages/Home";
import Auth from "./Pages/Auth/Auth";
import CreateRecipe from "./Pages/CreateRecipe";
import Saved from "./Pages/Saved";
import { Navbar } from "./Components/Navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/saved-recipes" element={<Saved />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
