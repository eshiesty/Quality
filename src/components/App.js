import React from "react";
import Header from "./Header";

import ModeButton from "./ModeButton";
import Background from "./background";
import Daily from "./pages/Daily";
import Home from "./pages/Home";
import Weekly from "./pages/Weekly";
import Monthly from "./pages/Monthly";
import Profile from "./pages/Profile";
import Create from "./pages/Create";
import Footer from "./Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <Header />
      <Background />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/daily" element={<Daily />} />
        <Route exact path="/weekly" element={<Weekly />} />
        <Route exact path="/monthly" element={<Monthly />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/create" element={<Create />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
