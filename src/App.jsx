import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Homepage from "./homepage";
import About from "./about";
import Services from './services';
import RegisterPhysio from './RegisterPhysio';
import Signup from "./signup";
import Login from "./login";
import FindPhysio from './FindPhysio';
import BookAppointment from './BookingPage';
import UserDashboard from './UserDashboard';
import DoctorDashboard from './DoctorDashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AdminRoute from "./AdminRoute"; 
import AdminDashboard from "./components/AdminDashboard";
import ManageUsers from "./components/ManageUsers";
import ManagePhysiotherapists from "./components/ManagePhysiotherapists";
import ManageAppointments from "./components/ManageAppointments";
import AdminLayout from "./components/AdminLayout";
import BookRedirect from "./BookRedirect";
import Chatbot from './components/Chatbot';

import React from "react";

// Wrapper for conditional chatbot rendering
function AppWrapper() {
  const location = useLocation();
  const showChatbot = location.pathname === "/" || location.pathname === "/book-appointment";

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/register-physio" element={<RegisterPhysio />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/find-physio" element={<FindPhysio />} />
        <Route path="/book-appointment" element={<BookAppointment />} />   
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard doctorId="your-doc-id-from-auth-or-props" />} />    

        <Route path="/admin" element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="physiotherapists" element={<ManagePhysiotherapists />} />
          <Route path="appointments" element={<ManageAppointments />} />
        </Route>

        <Route path="/book" element={<BookRedirect />} />
      </Routes>

      {showChatbot && <Chatbot />}

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
