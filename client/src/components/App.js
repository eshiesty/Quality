import React from "react";
import Background from "./background";
import Daily from "../pages/Daily";
import Home from "../pages/Home";
import Weekly from "../pages/Weekly";
import Monthly from "../pages/Monthly";
import Profile from "../pages/Profile";
import Create from "../pages/Create";
import Landing from "../pages/Landing";
import Settings from "../pages/Settings";
import EditProfile from "../pages/EditProfile";
import AccountCreation from "../pages/AccountCreation";
import Activity from "../pages/Activity";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <Router>
      {/* <Header /> */}
      <Background />
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/daily" element={<Daily />} />
        <Route exact path="/weekly" element={<Weekly />} />
        <Route exact path="/monthly" element={<Monthly />} />
        <Route exact path="/profile/:username" element={<Profile />} />
        <Route exact path="/create" element={<Create />} />
        <Route exact path="/createaccount" element={<AccountCreation />} />
        <Route exact path="/settings" element={<Settings />} />
        <Route exact path="/editprofile" element={<EditProfile />} />
        <Route exact path="/activity" element={<Activity />} />
        <Route exact path="/" element={<Landing />} />
      </Routes>
    </Router>
  );
};

export default App;
