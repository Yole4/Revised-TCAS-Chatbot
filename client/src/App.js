import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import './components/assets/css/Css.css';
import './components/assets/css/Chatbot.css';

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
import ViewProject from "./components/pages/body/ViewProject";
import UsersRequestUpload from "./components/pages/body/admin/UsersRequestUpload";

// undefine 404
import Undefine from "./components/pages/404/Undefine";

// chatbot
import Chatbot from "./components/pages/body/chatbot/Chatbot";

// require auth context
import { useContext } from "react";
import { AuthContext } from "./components/Context/AuthContext";

function App() {

  const {user} = useContext(AuthContext);
  
  return (
    <>
      {user && <Chatbot />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={ user? <Home /> : <Login />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/view-project/:id" element={<ViewProject />} />
        <Route path="/new-project" element={user ? <SubmitProject /> : <Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={user ? user.user && user.user.userType === "Admin" ? <Dashboard /> : <Home /> : <Login />} />
        <Route path="/archive-list" element={user ? user.user && user.user.userType === "Admin" ? <Archive /> : <Home /> : <Login />} />
        <Route path="/request-user" element={ user? user.user && user.user.userType === "Admin" ? <UserRequest /> : <Home /> : <Login />} />
        <Route path="/document-request" element={ user? user.user && user.user.userType === "Admin" ? <UsersRequestUpload /> : <Home /> : <Login />} />
        <Route path="/department" element={ user? user.user && user.user.userType === "Admin" ? <Department /> : <Home /> : <Login />} />
        <Route path="/courses" element={ user? user.user && user.user.userType === "Admin" ? <Courses /> : <Home /> : <Login />} />
        <Route path="/school-year" element={ user? user.user && user.user.userType === "Admin" ? <SchoolYear /> : <Home /> : <Login />} />
        <Route path="/users" element={ user ? user.user && user.user.userType === "Admin" ? <Users /> : <Home /> : <Login />} />
        <Route path="/settings" element={ user? user.user && user.user.userType === "Admin" ? <Settings /> : <Home /> : <Login />} />

        <Route path="*" element={<Undefine />} />
      </Routes>
    </>
  );
}

export default App;
