import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './components/assets/css/Css.css';

import Login from "./components/pages/Login";
import Home from "./components/pages/body/Home";
import Projects from "./components/pages/body/Projects";
import SubmitProject from "./components/pages/body/SubmitProject";
import About from "./components/pages/body/About";
import Dashboard from "./components/pages/body/admin/Dashboard";
import Archive from "./components/pages/body/admin/Archive";
import UserRequest from "./components/pages/body/admin/UserRequest";
import Department from "./components/pages/body/admin/Department";
import Courses from "./components/pages/body/admin/Courses";
import SchoolYear from "./components/pages/body/admin/SchoolYear";
import Users from "./components/pages/body/admin/Users";
import Settings from "./components/pages/body/admin/Settings";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/new-project" element={<SubmitProject />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/archive-list" element={<Archive />} />
          <Route path="/request-user" element={<UserRequest />} />
          <Route path="/department" element={<Department />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/school-year" element={<SchoolYear />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
